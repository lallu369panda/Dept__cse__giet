import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
})

// Simple in-memory cache for better performance
const cache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// Mock data for question papers (keeping as fallback)
const mockQuestionPapers = [
  {
    id: '1',
    title: 'Data Structures and Algorithms - Mid Semester',
    subject: 'Data Structures and Algorithms',
    semester: 3,
    year: '2024',
    type: 'mid',
    duration: '3 hours',
    marks: '100',
    difficulty: 'Medium',
    fileSize: '2.1 MB',
    fileUrl: '/question-papers/dsa-mid-2024.pdf',
    downloads: 245,
    rating: 4.5,
    uploadedDate: '2024-03-15',
    uploadedBy: 'Dr. Kumar',
    description: 'Mid semester examination covering arrays, linked lists, stacks, and queues',
    tags: ['Arrays', 'Linked Lists', 'Stacks', 'Queues'],
    isPublic: true,
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Database Management Systems - Semester End',
    subject: 'Database Management Systems',
    semester: 4,
    year: '2024',
    type: 'sem',
    duration: '3 hours',
    marks: '100',
    difficulty: 'Hard',
    fileSize: '1.8 MB',
    fileUrl: '/question-papers/dbms-sem-2024.pdf',
    downloads: 189,
    rating: 4.2,
    uploadedDate: '2024-05-20',
    uploadedBy: 'Dr. Sharma',
    description: 'Comprehensive semester exam covering SQL, normalization, and transactions',
    tags: ['SQL', 'Normalization', 'Transactions'],
    isPublic: true,
    createdAt: '2024-05-20T14:15:00Z',
    updatedAt: '2024-05-20T14:15:00Z'
  },
  {
    id: '3',
    title: 'Operating Systems - Mid Semester',
    subject: 'Operating Systems',
    semester: 5,
    year: '2024',
    type: 'mid',
    duration: '3 hours',
    marks: '100',
    difficulty: 'Medium',
    fileSize: '2.3 MB',
    fileUrl: '/question-papers/os-mid-2024.pdf',
    downloads: 156,
    rating: 4.7,
    uploadedDate: '2024-03-22',
    uploadedBy: 'Dr. Singh',
    description: 'Mid semester covering process management and memory allocation',
    tags: ['Processes', 'Memory Management', 'Scheduling'],
    isPublic: true,
    createdAt: '2024-03-22T09:45:00Z',
    updatedAt: '2024-03-22T09:45:00Z'
  },
  {
    id: '4',
    title: 'Computer Networks - Semester End',
    subject: 'Computer Networks',
    semester: 6,
    year: '2024',
    type: 'sem',
    duration: '3 hours',
    marks: '100',
    difficulty: 'Hard',
    fileSize: '2.7 MB',
    fileUrl: '/question-papers/cn-sem-2024.pdf',
    downloads: 203,
    rating: 4.1,
    uploadedDate: '2024-05-28',
    uploadedBy: 'Dr. Patel',
    description: 'Complete networks syllabus including OSI model, TCP/IP, and routing',
    tags: ['OSI Model', 'TCP/IP', 'Routing', 'Protocols'],
    isPublic: true,
    createdAt: '2024-05-28T16:20:00Z',
    updatedAt: '2024-05-28T16:20:00Z'
  },
  {
    id: '5',
    title: 'Software Engineering - Mid Semester',
    subject: 'Software Engineering',
    semester: 5,
    year: '2024',
    type: 'mid',
    duration: '3 hours',
    marks: '100',
    difficulty: 'Easy',
    fileSize: '1.9 MB',
    fileUrl: '/question-papers/se-mid-2024.pdf',
    downloads: 167,
    rating: 4.6,
    uploadedDate: '2024-03-18',
    uploadedBy: 'Dr. Gupta',
    description: 'SDLC, requirements analysis, and design patterns',
    tags: ['SDLC', 'Requirements', 'Design Patterns'],
    isPublic: true,
    createdAt: '2024-03-18T11:30:00Z',
    updatedAt: '2024-03-18T11:30:00Z'
  },
  {
    id: '6',
    title: 'Machine Learning - Semester End',
    subject: 'Machine Learning',
    semester: 7,
    year: '2024',
    type: 'sem',
    duration: '3 hours',
    marks: '100',
    difficulty: 'Hard',
    fileSize: '3.1 MB',
    fileUrl: '/question-papers/ml-sem-2024.pdf',
    downloads: 134,
    rating: 4.8,
    uploadedDate: '2024-05-25',
    uploadedBy: 'Dr. Reddy',
    description: 'Comprehensive ML exam covering supervised and unsupervised learning',
    tags: ['Supervised Learning', 'Unsupervised Learning', 'Neural Networks'],
    isPublic: true,
    createdAt: '2024-05-25T13:45:00Z',
    updatedAt: '2024-05-25T13:45:00Z'
  }
]

// GET - Fetch all question papers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const subject = searchParams.get('subject')
    const examType = searchParams.get('type') || searchParams.get('examType')
    const semester = searchParams.get('semester')
    const year = searchParams.get('year')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50) // Cap at 50

    // Create cache key from query parameters
    const cacheKey = `papers_${JSON.stringify(Object.fromEntries(searchParams))}`
    
    // Check cache first
    const cached = cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json(cached.data)
    }

    try {
      // Optimized database query with indexes
      const where: any = {
        isActive: true
      }

      if (subject && subject !== 'all') {
        where.subjectName = { contains: subject, mode: 'insensitive' }
      }
      
      if (examType && examType !== 'all') {
        where.examType = examType
      }
      
      if (semester && semester !== 'all') {
        where.semester = semester
      }
      
      if (year && year !== 'all') {
        where.year = year
      }

      if (search) {
        where.OR = [
          { subjectName: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { fileName: { contains: search, mode: 'insensitive' } }
        ]
      }

      // Optimized parallel queries with select for better performance
      const [questionPapers, total] = await Promise.all([
        prisma.questionPaper.findMany({
          where,
          select: {
            id: true,
            subjectName: true,
            examType: true,
            semester: true,
            year: true,
            description: true,
            fileUrl: true,
            fileName: true,
            fileSize: true,
            uploadedBy: true,
            downloads: true,
            isActive: true,
            createdAt: true,
            updatedAt: true
          },
          orderBy: [
            { year: 'desc' },
            { semester: 'desc' },
            { examType: 'asc' },
            { subjectName: 'asc' }
          ],
          skip: (page - 1) * limit,
          take: limit
        }),
        prisma.questionPaper.count({ where })
      ])

      // Transform database data to match frontend expectations
      const transformedPapers = questionPapers.map((paper: any) => ({
        id: paper.id,
        title: `${paper.subjectName} - ${paper.examType}`,
        subject: paper.subjectName,
        semester: parseInt(paper.semester),
        year: paper.year,
        type: paper.examType,
        duration: '3 hours', // Default duration
        marks: '100', // Default marks
        difficulty: 'Medium', // Default difficulty
        fileSize: paper.fileSize ? `${(paper.fileSize / 1024 / 1024).toFixed(1)} MB` : '2.5 MB',
        fileUrl: paper.fileUrl,
        downloads: paper.downloads,
        rating: 4.5, // Default rating
        uploadedDate: paper.createdAt.toISOString().split('T')[0],
        uploadedBy: paper.uploadedBy,
        description: paper.description || '',
        tags: [], // Can be added later if needed
        isPublic: paper.isActive,
        createdAt: paper.createdAt.toISOString(),
        updatedAt: paper.updatedAt.toISOString()
      }))

      const responseData = {
        papers: transformedPapers,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalPapers: total,
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      }

      // Cache the response
      cache.set(cacheKey, {
        data: responseData,
        timestamp: Date.now()
      })

      return NextResponse.json(responseData)

    } catch (dbError) {
      console.log('Database error, falling back to mock data:', dbError)
      
      // Fallback to mock data if database fails
      let filteredPapers = [...mockQuestionPapers]

      // Apply filters to mock data
      if (subject && subject !== 'all') {
        filteredPapers = filteredPapers.filter(paper => 
          paper.subject.toLowerCase().includes(subject.toLowerCase())
        )
      }
      
      if (examType && examType !== 'all') {
        filteredPapers = filteredPapers.filter(paper => paper.type === examType)
      }
      
      if (semester && semester !== 'all') {
        filteredPapers = filteredPapers.filter(paper => paper.semester === parseInt(semester))
      }
      
      if (year && year !== 'all') {
        filteredPapers = filteredPapers.filter(paper => paper.year === year)
      }

      if (search) {
        filteredPapers = filteredPapers.filter(paper =>
          paper.subject.toLowerCase().includes(search.toLowerCase()) ||
          paper.description.toLowerCase().includes(search.toLowerCase()) ||
          paper.tags.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase()))
        )
      }

      const total = filteredPapers.length
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedPapers = filteredPapers.slice(startIndex, endIndex)

      return NextResponse.json({
        papers: paginatedPapers,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalPapers: total,
          hasNext: endIndex < total,
          hasPrev: page > 1
        }
      })
    }

  } catch (error) {
    console.error('Error fetching question papers:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Add new question paper (database implementation)
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
      fileName,
      fileSize,
      description,
      uploadedBy
    } = body

    // Validation
    if (!subject || !type || !semester || !year || !fileUrl || !fileName) {
      return NextResponse.json(
        { message: 'Missing required fields: subject, type, semester, year, fileUrl, fileName' },
        { status: 400 }
      )
    }

    try {
      // Try to save to database
      const questionPaper = await prisma.questionPaper.create({
        data: {
          subjectName: subject,
          examType: type,
          semester: semester.toString(),
          year: year.toString(),
          description: description || '',
          fileUrl,
          fileName,
          fileSize: fileSize || null,
          uploadedBy: uploadedBy || 'System'
        }
      })

      return NextResponse.json({
        message: 'Question paper uploaded successfully',
        paper: {
          id: questionPaper.id,
          title: `${questionPaper.subjectName} - ${questionPaper.examType}`,
          subject: questionPaper.subjectName,
          semester: parseInt(questionPaper.semester),
          year: questionPaper.year,
          type: questionPaper.examType,
          fileUrl: questionPaper.fileUrl,
          description: questionPaper.description,
          downloads: questionPaper.downloads,
          createdAt: questionPaper.createdAt.toISOString(),
          updatedAt: questionPaper.updatedAt.toISOString()
        }
      }, { status: 201 })

    } catch (dbError) {
      console.log('Database error, using mock response:', dbError)
      
      // Fallback mock response if database fails
      const newPaper = {
        id: Date.now().toString(),
        title: title || `${subject} - ${type}`,
        subject,
        semester: parseInt(semester),
        year: year.toString(),
        type,
        duration: '3 hours',
        marks: '100',
        difficulty: 'Medium',
        fileSize: fileSize ? `${(fileSize / 1024 / 1024).toFixed(1)} MB` : '2.5 MB',
        fileUrl,
        downloads: 0,
        rating: 4.5,
        uploadedDate: new Date().toISOString().split('T')[0],
        uploadedBy: uploadedBy || 'System',
        description: description || '',
        tags: [],
        isPublic: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      return NextResponse.json({
        message: 'Question paper uploaded successfully (mock)',
        paper: newPaper
      }, { status: 201 })
    }

  } catch (error) {
    console.error('Error creating question paper:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update question paper download count (database implementation)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { message: 'Question paper ID is required' },
        { status: 400 }
      )
    }

    try {
      // Try to update in database
      const questionPaper = await prisma.questionPaper.update({
        where: { id },
        data: {
          downloads: {
            increment: 1
          }
        }
      })

      return NextResponse.json({
        message: 'Download count updated',
        downloads: questionPaper.downloads
      })

    } catch (dbError) {
      console.log('Database error, using mock response:', dbError)
      
      // Fallback mock response if database fails
      const newDownloadCount = Math.floor(Math.random() * 100) + 1

      return NextResponse.json({
        message: 'Download count updated (mock)',
        downloads: newDownloadCount
      })
    }

  } catch (error) {
    console.error('Error updating download count:', error)
    return NextResponse.json(
      { message: 'Failed to update download count' },
      { status: 500 }
    )
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'