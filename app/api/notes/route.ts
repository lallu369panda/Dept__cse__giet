import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
})

// Cache for better performance
const cache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// Keeping mock data as fallback
let mockNotes = [
  {
    id: 1,
    title: 'Data Structures Complete Notes',
    subject: 'Data Structures',
    semester: 3,
    year: '2024',
    type: 'Complete Notes',
    fileSize: '15.2 MB',
    fileUrl: '/uploads/notes/data-structures-complete-notes.pdf',
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
    fileUrl: '/uploads/notes/database-management-system-notes.pdf',
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
    fileUrl: '/uploads/notes/operating-systems-quick-reference.pdf',
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

    // Create cache key for this request
    const cacheKey = `notes:${semester || 'all'}:${subject || 'all'}:${year || 'all'}:${type || 'all'}:${search || ''}:${page}:${limit}`
    
    // Check cache first
    if (cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey)
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
        return NextResponse.json(cachedData.data)
      }
    }

    try {
      // Try to fetch from database first
      const where: any = {
        isActive: true
      }

      if (semester && semester !== 'all') {
        where.semester = semester
      }
      
      if (subject && subject !== 'all') {
        where.subjectName = { contains: subject, mode: 'insensitive' }
      }
      
      if (year && year !== 'all') {
        where.year = year
      }
      
      if (type && type !== 'all') {
        where.type = type
      }

      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { subjectName: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      }

      const [notes, total] = await Promise.all([
        prisma.note.findMany({
          where,
          select: {
            id: true,
            title: true,
            subjectName: true,
            semester: true,
            year: true,
            type: true,
            fileSize: true,
            fileUrl: true,
            downloads: true,
            createdAt: true,
            updatedAt: true,
            uploadedBy: true,
            description: true,
            chapters: true,
            isActive: true
          },
          orderBy: [
            { year: 'desc' },
            { semester: 'asc' },
            { subjectName: 'asc' }
          ],
          skip: (page - 1) * limit,
          take: limit
        }),
        prisma.note.count({ where })
      ])

      // Transform database data to match frontend expectations
      const transformedNotes = notes.map((note: any) => ({
        id: note.id,
        title: note.title,
        subject: note.subjectName,
        semester: parseInt(note.semester),
        year: note.year,
        type: note.type,
        fileSize: note.fileSize ? `${(note.fileSize / 1024 / 1024).toFixed(1)} MB` : '10.0 MB',
        fileUrl: note.fileUrl,
        downloads: note.downloads,
        rating: 4.5, // Default rating for now
        uploadedDate: note.createdAt.toISOString().split('T')[0],
        uploadedBy: note.uploadedBy,
        description: note.description || '',
        chapters: note.chapters ? JSON.parse(note.chapters) : [],
        tags: [], // Can be added later if needed
        isPublic: note.isActive,
        createdAt: note.createdAt.toISOString(),
        updatedAt: note.updatedAt.toISOString()
      }))

      const response = {
        notes: transformedNotes,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalNotes: total,
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      }

      // Cache the response
      cache.set(cacheKey, {
        data: response,
        timestamp: Date.now()
      })

      return NextResponse.json(response)

    } catch (dbError) {
      console.log('Database error, falling back to mock data:', dbError)
      
      // Fallback to mock data if database fails
      let filteredNotes = [...mockNotes]

      // Apply filters to mock data
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
          note.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
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
    }

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
      fileName,
      fileSize,
      description,
      chapters = [],
      uploadedBy
    } = body

    // Validate required fields
    if (!title || !subject || !semester || !year || !type) {
      return NextResponse.json(
        { message: 'Missing required fields: title, subject, semester, year, type' },
        { status: 400 }
      )
    }

    try {
      // Try to save to database first
      const note = await prisma.note.create({
        data: {
          title,
          subjectName: subject,
          semester: semester.toString(),
          year: year.toString(),
          type,
          fileUrl: fileUrl || '/uploads/notes/sample-note.pdf',
          fileName: fileName || `${title}.pdf`,
          fileSize: fileSize || null,
          description: description || '',
          chapters: Array.isArray(chapters) ? JSON.stringify(chapters) : null,
          uploadedBy: uploadedBy || 'System'
        }
      })

      return NextResponse.json({
        message: 'Notes uploaded successfully',
        note: {
          id: note.id,
          title: note.title,
          subject: note.subjectName,
          semester: parseInt(note.semester),
          year: note.year,
          type: note.type,
          fileUrl: note.fileUrl,
          description: note.description,
          downloads: note.downloads,
          createdAt: note.createdAt.toISOString(),
          updatedAt: note.updatedAt.toISOString()
        }
      }, { status: 201 })

    } catch (dbError) {
      console.log('Database error, using mock response:', dbError)
      
      // Fallback mock response if database fails
      const newNote = {
        id: Date.now().toString(),
        title,
        subject,
        semester: parseInt(semester),
        year,
        type,
        fileSize: fileSize ? `${(fileSize / 1024 / 1024).toFixed(1)} MB` : '10.0 MB',
        fileUrl: fileUrl || '/uploads/notes/default-note.pdf',
        downloads: 0,
        rating: 0,
        uploadedDate: new Date().toISOString().split('T')[0],
        uploadedBy: uploadedBy || 'System',
        description: description || '',
        chapters: Array.isArray(chapters) ? chapters : [],
        tags: [],
        isPublic: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      return NextResponse.json({
        message: 'Notes uploaded successfully (mock)',
        note: newNote
      }, { status: 201 })
    }

  } catch (error) {
    console.error('Error uploading notes:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
