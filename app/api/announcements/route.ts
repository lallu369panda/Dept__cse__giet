import { NextRequest, NextResponse } from 'next/server'

// Mock data - In production, this would come from a database
let announcements = [
  {
    id: 1,
    title: 'Mid-Term Examination Schedule Released',
    content: 'The mid-term examination schedule for the current semester has been released. Please check the academic calendar for detailed information.',
    type: 'Academic',
    priority: 'High',
    targetAudience: 'All Students',
    author: 'Dr. Rajesh Kumar',
    authorRole: 'Dean',
    isActive: true,
    startDate: '2024-03-01T00:00:00Z',
    endDate: '2024-03-31T23:59:59Z',
    attachments: [
      {
        name: 'Mid-Term Schedule.pdf',
        url: '/api/placeholder/400/600',
        size: '2.5 MB'
      }
    ],
    createdAt: '2024-02-25T10:00:00Z',
    updatedAt: '2024-02-25T10:00:00Z'
  },
  {
    id: 2,
    title: 'Hackathon Registration Open',
    content: 'Registration for the annual CSE Hackathon is now open. Form teams of 2-4 members and register before March 15th.',
    type: 'Event',
    priority: 'Medium',
    targetAudience: 'Students',
    author: 'CodeCraft Club',
    authorRole: 'Club',
    isActive: true,
    startDate: '2024-02-20T00:00:00Z',
    endDate: '2024-03-15T23:59:59Z',
    attachments: [],
    createdAt: '2024-02-20T09:00:00Z',
    updatedAt: '2024-02-20T09:00:00Z'
  },
  {
    id: 3,
    title: 'Library Hours Extended',
    content: 'The library will remain open until 10 PM during examination period to support students in their studies.',
    type: 'General',
    priority: 'Low',
    targetAudience: 'All Students',
    author: 'Library Administration',
    authorRole: 'Administration',
    isActive: true,
    startDate: '2024-03-01T00:00:00Z',
    endDate: '2024-04-30T23:59:59Z',
    attachments: [],
    createdAt: '2024-02-28T14:00:00Z',
    updatedAt: '2024-02-28T14:00:00Z'
  },
  {
    id: 4,
    title: 'Faculty Meeting - March 5th',
    content: 'Monthly faculty meeting scheduled for March 5th at 2 PM in the conference room. All faculty members are requested to attend.',
    type: 'Faculty',
    priority: 'High',
    targetAudience: 'Faculty',
    author: 'Dr. Sunita Sharma',
    authorRole: 'HOD',
    isActive: true,
    startDate: '2024-03-01T00:00:00Z',
    endDate: '2024-03-05T23:59:59Z',
    attachments: [],
    createdAt: '2024-02-28T16:00:00Z',
    updatedAt: '2024-02-28T16:00:00Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const priority = searchParams.get('priority')
    const targetAudience = searchParams.get('targetAudience')
    const search = searchParams.get('search')
    const isActive = searchParams.get('isActive')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredAnnouncements = [...announcements]

    // Apply filters
    if (type && type !== 'all') {
      filteredAnnouncements = filteredAnnouncements.filter(announcement => announcement.type === type)
    }

    if (priority && priority !== 'all') {
      filteredAnnouncements = filteredAnnouncements.filter(announcement => announcement.priority === priority)
    }

    if (targetAudience && targetAudience !== 'all') {
      filteredAnnouncements = filteredAnnouncements.filter(announcement => 
        announcement.targetAudience === targetAudience || announcement.targetAudience === 'All'
      )
    }

    if (isActive !== null && isActive !== undefined) {
      filteredAnnouncements = filteredAnnouncements.filter(announcement => 
        announcement.isActive === (isActive === 'true')
      )
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredAnnouncements = filteredAnnouncements.filter(announcement =>
        announcement.title.toLowerCase().includes(searchLower) ||
        announcement.content.toLowerCase().includes(searchLower) ||
        announcement.author.toLowerCase().includes(searchLower)
      )
    }

    // Sort by priority and creation date
    filteredAnnouncements.sort((a, b) => {
      const priorityOrder: { [key: string]: number } = { 'High': 3, 'Medium': 2, 'Low': 1 }
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedAnnouncements = filteredAnnouncements.slice(startIndex, endIndex)

    return NextResponse.json({
      announcements: paginatedAnnouncements,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredAnnouncements.length / limit),
        totalAnnouncements: filteredAnnouncements.length,
        hasNext: endIndex < filteredAnnouncements.length,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching announcements:', error)
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
      content,
      type,
      priority = 'Medium',
      targetAudience = 'All',
      author,
      authorRole,
      startDate,
      endDate,
      attachments = []
    } = body

    // Validate required fields
    if (!title || !content || !type || !author) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newAnnouncement = {
      id: announcements.length + 1,
      title,
      content,
      type,
      priority,
      targetAudience,
      author,
      authorRole: authorRole || 'System',
      isActive: true,
      startDate: startDate || new Date().toISOString(),
      endDate: endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      attachments: Array.isArray(attachments) ? attachments : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    announcements.push(newAnnouncement)

    return NextResponse.json(
      { message: 'Announcement created successfully', announcement: newAnnouncement },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating announcement:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
