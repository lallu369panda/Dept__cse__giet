import { NextRequest, NextResponse } from 'next/server'

// Mock data - In production, this would come from a database
let events = [
  {
    id: 1,
    title: 'Tech Symposium 2024',
    description: 'Annual technical symposium featuring latest innovations in computer science and engineering.',
    date: '2024-03-15',
    time: '09:00 AM',
    location: 'Main Auditorium',
    type: 'Conference',
    category: 'conference',
    attendees: 150,
    maxAttendees: 200,
    image: '/api/placeholder/800/500',
    featured: true,
    status: 'upcoming',
    organizer: 'CSE Department',
    contactEmail: 'events@cse.edu',
    requirements: 'Open to all CSE students',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Hackathon Competition',
    description: '48-hour coding competition for students to showcase their programming skills.',
    date: '2024-03-22',
    time: '10:00 AM',
    location: 'Computer Lab 1',
    type: 'Competition',
    category: 'competition',
    attendees: 80,
    maxAttendees: 100,
    image: '/api/placeholder/800/500',
    featured: true,
    status: 'upcoming',
    organizer: 'CodeCraft Club',
    contactEmail: 'hackathon@cse.edu',
    requirements: 'Team of 2-4 members',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 3,
    title: 'Machine Learning Workshop',
    description: 'Hands-on workshop on machine learning algorithms and applications.',
    date: '2024-03-28',
    time: '02:00 PM',
    location: 'Seminar Hall',
    type: 'Workshop',
    category: 'workshop',
    attendees: 60,
    maxAttendees: 80,
    image: '/api/placeholder/800/500',
    featured: false,
    status: 'upcoming',
    organizer: 'Innovation Lab',
    contactEmail: 'ml-workshop@cse.edu',
    requirements: 'Basic programming knowledge',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z'
  },
  {
    id: 4,
    title: 'Alumni Meet 2024',
    description: 'Annual alumni gathering with networking opportunities and career guidance sessions.',
    date: '2024-04-05',
    time: '11:00 AM',
    location: 'Campus Ground',
    type: 'Networking',
    category: 'conference',
    attendees: 200,
    maxAttendees: 300,
    image: '/api/placeholder/800/500',
    featured: true,
    status: 'upcoming',
    organizer: 'Alumni Association',
    contactEmail: 'alumni@cse.edu',
    requirements: 'Open to all',
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredEvents = [...events]

    // Apply filters
    if (category && category !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.category === category)
    }

    if (status && status !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.status === status)
    }

    if (featured === 'true') {
      filteredEvents = filteredEvents.filter(event => event.featured === true)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.type.toLowerCase().includes(searchLower)
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex)

    return NextResponse.json({
      events: paginatedEvents,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredEvents.length / limit),
        totalEvents: filteredEvents.length,
        hasNext: endIndex < filteredEvents.length,
        hasPrev: page > 1
      }
    })
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
      featured = false
    } = body

    // Validate required fields
    if (!title || !description || !date || !time || !location || !type) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newEvent = {
      id: events.length + 1,
      title,
      description,
      date,
      time,
      location,
      type,
      category: category || 'general',
      attendees: 0,
      maxAttendees: maxAttendees || 100,
      image: '/api/placeholder/800/500',
      featured,
      status: 'upcoming',
      organizer: organizer || 'CSE Department',
      contactEmail: contactEmail || 'events@cse.edu',
      requirements: requirements || 'Open to all',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    events.push(newEvent)

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
