import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// In-memory cache for events data
const cache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Create cache key for this request
    const cacheKey = `events:${category || 'all'}:${status || 'all'}:${featured || 'false'}:${search || ''}:${page}:${limit}`
    
    // Check cache first
    if (cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey)
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
        return NextResponse.json(cachedData.data)
      }
    }

    // Build where condition for Prisma
    const where: any = {}

    if (category && category !== 'all') {
      where.category = category
    }

    if (status && status !== 'all') {
      where.status = status
    }

    if (featured === 'true') {
      where.featured = true
    }

    if (search) {
      const searchLower = search.toLowerCase()
      where.OR = [
        { title: { contains: searchLower, mode: 'insensitive' } },
        { description: { contains: searchLower, mode: 'insensitive' } },
        { type: { contains: searchLower, mode: 'insensitive' } }
      ]
    }

    // Get both count and events in parallel with optimized select
    const [totalEvents, events] = await Promise.all([
      prisma.event.count({ where }),
      prisma.event.findMany({
        where,
        select: {
          id: true,
          title: true,
          description: true,
          date: true,
          time: true,
          location: true,
          type: true,
          category: true,
          attendees: true,
          maxAttendees: true,
          image: true,
          featured: true,
          status: true,
          organizer: true,
          contactEmail: true,
          requirements: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: [
          { featured: 'desc' },
          { date: 'asc' }
        ],
        skip: (page - 1) * limit,
        take: limit
      })
    ])

    const response = {
      events,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalEvents / limit),
        totalEvents,
        hasNext: page * limit < totalEvents,
        hasPrev: page > 1
      }
    }

    // Cache the response
    cache.set(cacheKey, {
      data: response,
      timestamp: Date.now()
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      date,
      time,
      location,
      type,
      category,
      maxAttendees,
      organizer,
      contactEmail,
      requirements,
      featured = false,
      image
    } = body

    // Validate required fields
    if (!title || !description || !date || !time || !location || !type || !organizer || !contactEmail) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new event in database
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        time,
        location,
        type,
        category: category || 'general',
        attendees: 0,
        maxAttendees: maxAttendees || 100,
        image: image || '/uploads/events/default-event.jpg',
        featured,
        status: 'upcoming',
        organizer,
        contactEmail,
        requirements: requirements || 'Open to all'
      }
    })

    return NextResponse.json(
      { message: 'Event created successfully', event: newEvent },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
