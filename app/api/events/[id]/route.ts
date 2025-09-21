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
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = parseInt(params.id)
    const event = events.find(e => e.id === eventId)

    if (!event) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ event })
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = parseInt(params.id)
    const body = await request.json()
    
    const eventIndex = events.findIndex(e => e.id === eventId)
    
    if (eventIndex === -1) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      )
    }

    const updatedEvent = {
      ...events[eventIndex],
      ...body,
      id: eventId,
      updatedAt: new Date().toISOString()
    }

    events[eventIndex] = updatedEvent

    return NextResponse.json({
      message: 'Event updated successfully',
      event: updatedEvent
    })
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = parseInt(params.id)
    const eventIndex = events.findIndex(e => e.id === eventId)
    
    if (eventIndex === -1) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      )
    }

    events.splice(eventIndex, 1)

    return NextResponse.json({
      message: 'Event deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
