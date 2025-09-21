import { NextRequest, NextResponse } from 'next/server'

// Mock data - In production, this would come from a database
const academicCalendar = [
  {
    id: 1,
    semester: 1,
    academicYear: '2024-25',
    events: [
      {
        id: 1,
        title: 'Semester Begins',
        date: '2024-08-01',
        type: 'Academic',
        description: 'First semester classes begin',
        isHoliday: false,
        priority: 'high'
      },
      {
        id: 2,
        title: 'Mid Term Exams',
        date: '2024-09-15',
        type: 'Exam',
        description: 'Mid-term examinations for all subjects',
        isHoliday: false,
        priority: 'high'
      },
      {
        id: 3,
        title: 'Mid Term Break',
        date: '2024-10-01',
        type: 'Holiday',
        description: 'Mid-term vacation',
        isHoliday: true,
        priority: 'medium'
      },
      {
        id: 4,
        title: 'Final Exams',
        date: '2024-11-15',
        type: 'Exam',
        description: 'Final examinations for all subjects',
        isHoliday: false,
        priority: 'high'
      },
      {
        id: 5,
        title: 'Semester Ends',
        date: '2024-12-15',
        type: 'Academic',
        description: 'First semester ends',
        isHoliday: false,
        priority: 'high'
      }
    ]
  },
  {
    id: 2,
    semester: 2,
    academicYear: '2024-25',
    events: [
      {
        id: 6,
        title: 'Semester Begins',
        date: '2024-12-16',
        type: 'Academic',
        description: 'Second semester classes begin',
        isHoliday: false,
        priority: 'high'
      },
      {
        id: 7,
        title: 'Mid Term Exams',
        date: '2025-01-15',
        type: 'Exam',
        description: 'Mid-term examinations for all subjects',
        isHoliday: false,
        priority: 'high'
      },
      {
        id: 8,
        title: 'Mid Term Break',
        date: '2025-02-01',
        type: 'Holiday',
        description: 'Mid-term vacation',
        isHoliday: true,
        priority: 'medium'
      },
      {
        id: 9,
        title: 'Final Exams',
        date: '2025-03-15',
        type: 'Exam',
        description: 'Final examinations for all subjects',
        isHoliday: false,
        priority: 'high'
      },
      {
        id: 10,
        title: 'Semester Ends',
        date: '2025-04-15',
        type: 'Academic',
        description: 'Second semester ends',
        isHoliday: false,
        priority: 'high'
      }
    ]
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const semester = searchParams.get('semester')
    const year = searchParams.get('year')
    const type = searchParams.get('type')
    const month = searchParams.get('month')

    let filteredCalendar = [...academicCalendar]

    // Apply filters
    if (semester && semester !== 'all') {
      filteredCalendar = filteredCalendar.filter(cal => cal.semester.toString() === semester)
    }

    if (year && year !== 'all') {
      filteredCalendar = filteredCalendar.filter(cal => cal.academicYear === year)
    }

    // Filter events by type if specified
    if (type && type !== 'all') {
      filteredCalendar = filteredCalendar.map(cal => ({
        ...cal,
        events: cal.events.filter(event => event.type === type)
      }))
    }

    // Filter events by month if specified
    if (month) {
      filteredCalendar = filteredCalendar.map(cal => ({
        ...cal,
        events: cal.events.filter(event => {
          const eventMonth = new Date(event.date).getMonth() + 1
          return eventMonth.toString() === month
        })
      }))
    }

    return NextResponse.json({
      calendar: filteredCalendar,
      totalEvents: filteredCalendar.reduce((total, cal) => total + cal.events.length, 0)
    })
  } catch (error) {
    console.error('Error fetching academic calendar:', error)
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
      semester,
      academicYear,
      title,
      date,
      type,
      description,
      isHoliday = false,
      priority = 'medium'
    } = body

    // Validate required fields
    if (!semester || !academicYear || !title || !date || !type) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find existing semester calendar or create new one
    let semesterCalendar = academicCalendar.find(cal => 
      cal.semester === parseInt(semester) && cal.academicYear === academicYear
    )

    if (!semesterCalendar) {
      semesterCalendar = {
        id: academicCalendar.length + 1,
        semester: parseInt(semester),
        academicYear,
        events: []
      }
      academicCalendar.push(semesterCalendar)
    }

    const newEvent = {
      id: Date.now(), // Simple ID generation
      title,
      date,
      type,
      description: description || '',
      isHoliday,
      priority
    }

    semesterCalendar.events.push(newEvent)

    return NextResponse.json(
      { message: 'Event added to academic calendar successfully', event: newEvent },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error adding event to academic calendar:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
