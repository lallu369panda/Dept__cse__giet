import { NextRequest, NextResponse } from 'next/server'

// Mock data - In production, this would come from a database
let notes = [
  {
    id: 1,
    title: 'Data Structures Complete Notes',
    subject: 'Data Structures',
    semester: 3,
    year: '2024',
    type: 'Complete Notes',
    fileSize: '15.2 MB',
    fileUrl: '/api/placeholder/400/600',
    downloads: 456,
    rating: 4.8,
    uploadedDate: '2024-01-10',
    uploadedBy: 'Dr. Rajesh Kumar',
    description: 'Comprehensive notes covering all topics from arrays to advanced data structures.',
    chapters: ['Arrays', 'Linked Lists', 'Stacks & Queues', 'Trees', 'Graphs', 'Hashing'],
    tags: ['data-structures', 'algorithms', 'programming'],
    isPublic: true,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 2,
    title: 'Database Management System Notes',
    subject: 'Database Management',
    semester: 4,
    year: '2024',
    type: 'Complete Notes',
    fileSize: '22.1 MB',
    fileUrl: '/api/placeholder/400/600',
    downloads: 389,
    rating: 4.7,
    uploadedDate: '2024-01-15',
    uploadedBy: 'Prof. Sunita Sharma',
    description: 'Detailed notes on database concepts, SQL, normalization, and transactions.',
    chapters: ['Introduction to DBMS', 'ER Model', 'Relational Model', 'SQL', 'Normalization', 'Transactions'],
    tags: ['database', 'sql', 'normalization', 'dbms'],
    isPublic: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 3,
    title: 'Operating Systems Quick Reference',
    subject: 'Operating Systems',
    semester: 4,
    year: '2024',
    type: 'Quick Reference',
    fileSize: '8.5 MB',
    fileUrl: '/api/placeholder/400/600',
    downloads: 234,
    rating: 4.5,
    uploadedDate: '2024-02-01',
    uploadedBy: 'Dr. Amit Singh',
    description: 'Quick reference guide for OS concepts and important formulas.',
    chapters: ['Process Management', 'Memory Management', 'File Systems', 'Deadlocks', 'Scheduling'],
    tags: ['operating-systems', 'process-management', 'memory-management'],
    isPublic: true,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const semester = searchParams.get('semester')
    const subject = searchParams.get('subject')
    const year = searchParams.get('year')
    const type = searchParams.get('type')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredNotes = [...notes]

    // Apply filters
    if (semester && semester !== 'all') {
      filteredNotes = filteredNotes.filter(note => note.semester.toString() === semester)
    }

    if (subject && subject !== 'all') {
      filteredNotes = filteredNotes.filter(note => note.subject === subject)
    }

    if (year && year !== 'all') {
      filteredNotes = filteredNotes.filter(note => note.year === year)
    }

    if (type && type !== 'all') {
      filteredNotes = filteredNotes.filter(note => note.type === type)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredNotes = filteredNotes.filter(note =>
        note.title.toLowerCase().includes(searchLower) ||
        note.subject.toLowerCase().includes(searchLower) ||
        note.description.toLowerCase().includes(searchLower) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedNotes = filteredNotes.slice(startIndex, endIndex)

    return NextResponse.json({
      notes: paginatedNotes,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredNotes.length / limit),
        totalNotes: filteredNotes.length,
        hasNext: endIndex < filteredNotes.length,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching notes:', error)
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
      subject,
      semester,
      year,
      type,
      fileUrl,
      description,
      chapters = [],
      tags = [],
      uploadedBy
    } = body

    // Validate required fields
    if (!title || !subject || !semester || !year || !type) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newNote = {
      id: notes.length + 1,
      title,
      subject,
      semester: parseInt(semester),
      year,
      type,
      fileSize: '10.0 MB', // This would be calculated from actual file
      fileUrl: fileUrl || '/api/placeholder/400/600',
      downloads: 0,
      rating: 0,
      uploadedDate: new Date().toISOString().split('T')[0],
      uploadedBy: uploadedBy || 'System',
      description: description || '',
      chapters: Array.isArray(chapters) ? chapters : [],
      tags: Array.isArray(tags) ? tags : [],
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    notes.push(newNote)

    return NextResponse.json(
      { message: 'Notes uploaded successfully', note: newNote },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error uploading notes:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
