import { NextRequest, NextResponse } from 'next/server'

// Mock data - In production, this would come from a database
let questionPapers = [
  {
    id: 1,
    title: 'Data Structures - Mid Term Exam',
    subject: 'Data Structures',
    semester: 3,
    year: '2024',
    type: 'Mid Term',
    duration: '3 hours',
    marks: '100',
    difficulty: 'Medium',
    fileSize: '2.5 MB',
    fileUrl: '/api/placeholder/400/600',
    downloads: 245,
    rating: 4.5,
    uploadedDate: '2024-01-15',
    uploadedBy: 'Dr. Rajesh Kumar',
    description: 'Comprehensive mid-term examination covering arrays, linked lists, stacks, and queues.',
    tags: ['arrays', 'linked-lists', 'stacks', 'queues'],
    isPublic: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Database Management - Final Exam',
    subject: 'Database Management',
    semester: 4,
    year: '2023',
    type: 'Final Exam',
    duration: '3 hours',
    marks: '100',
    difficulty: 'Hard',
    fileSize: '3.2 MB',
    fileUrl: '/api/placeholder/400/600',
    downloads: 189,
    rating: 4.3,
    uploadedDate: '2023-12-10',
    uploadedBy: 'Prof. Sunita Sharma',
    description: 'Final examination covering SQL, normalization, transactions, and database design.',
    tags: ['sql', 'normalization', 'transactions', 'database-design'],
    isPublic: true,
    createdAt: '2023-12-10T10:00:00Z',
    updatedAt: '2023-12-10T10:00:00Z'
  },
  {
    id: 3,
    title: 'Operating Systems - Quiz 1',
    subject: 'Operating Systems',
    semester: 4,
    year: '2024',
    type: 'Quiz',
    duration: '1 hour',
    marks: '50',
    difficulty: 'Easy',
    fileSize: '1.8 MB',
    fileUrl: '/api/placeholder/400/600',
    downloads: 156,
    rating: 4.7,
    uploadedDate: '2024-02-20',
    uploadedBy: 'Dr. Amit Singh',
    description: 'Quiz covering process management, memory management, and file systems.',
    tags: ['process-management', 'memory-management', 'file-systems'],
    isPublic: true,
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-02-20T10:00:00Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const semester = searchParams.get('semester')
    const subject = searchParams.get('subject')
    const year = searchParams.get('year')
    const type = searchParams.get('type')
    const difficulty = searchParams.get('difficulty')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredPapers = [...questionPapers]

    // Apply filters
    if (semester && semester !== 'all') {
      filteredPapers = filteredPapers.filter(paper => paper.semester.toString() === semester)
    }

    if (subject && subject !== 'all') {
      filteredPapers = filteredPapers.filter(paper => paper.subject === subject)
    }

    if (year && year !== 'all') {
      filteredPapers = filteredPapers.filter(paper => paper.year === year)
    }

    if (type && type !== 'all') {
      filteredPapers = filteredPapers.filter(paper => paper.type === type)
    }

    if (difficulty && difficulty !== 'all') {
      filteredPapers = filteredPapers.filter(paper => paper.difficulty === difficulty)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredPapers = filteredPapers.filter(paper =>
        paper.title.toLowerCase().includes(searchLower) ||
        paper.subject.toLowerCase().includes(searchLower) ||
        paper.description.toLowerCase().includes(searchLower) ||
        paper.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPapers = filteredPapers.slice(startIndex, endIndex)

    return NextResponse.json({
      papers: paginatedPapers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredPapers.length / limit),
        totalPapers: filteredPapers.length,
        hasNext: endIndex < filteredPapers.length,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching question papers:', error)
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
      duration,
      marks,
      difficulty,
      fileUrl,
      description,
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

    const newPaper = {
      id: questionPapers.length + 1,
      title,
      subject,
      semester: parseInt(semester),
      year,
      type,
      duration: duration || '3 hours',
      marks: marks || '100',
      difficulty: difficulty || 'Medium',
      fileSize: '2.5 MB', // This would be calculated from actual file
      fileUrl: fileUrl || '/api/placeholder/400/600',
      downloads: 0,
      rating: 0,
      uploadedDate: new Date().toISOString().split('T')[0],
      uploadedBy: uploadedBy || 'System',
      description: description || '',
      tags: Array.isArray(tags) ? tags : [],
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    questionPapers.push(newPaper)

    return NextResponse.json(
      { message: 'Question paper uploaded successfully', paper: newPaper },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error uploading question paper:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
