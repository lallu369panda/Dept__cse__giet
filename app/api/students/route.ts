import { NextRequest, NextResponse } from 'next/server'

// Mock data - In production, this would come from a database
let students = [
  {
    id: 1,
    studentId: 'CSE2024001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@student.edu',
    phone: '+1234567890',
    semester: 3,
    year: 2024,
    department: 'CSE',
    batch: '2022',
    cgpa: 8.5,
    attendance: 85,
    address: '123 Main St, City, State',
    dateOfBirth: '2000-05-15',
    gender: 'Male',
    bloodGroup: 'O+',
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Mother',
      phone: '+1234567891'
    },
    isActive: true,
    enrolledDate: '2022-08-01',
    createdAt: '2022-08-01T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    studentId: 'CSE2024002',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@student.edu',
    phone: '+1234567892',
    semester: 4,
    year: 2024,
    department: 'CSE',
    batch: '2021',
    cgpa: 9.2,
    attendance: 92,
    address: '456 Oak Ave, City, State',
    dateOfBirth: '1999-08-20',
    gender: 'Female',
    bloodGroup: 'A+',
    emergencyContact: {
      name: 'Robert Smith',
      relationship: 'Father',
      phone: '+1234567893'
    },
    isActive: true,
    enrolledDate: '2021-08-01',
    createdAt: '2021-08-01T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 3,
    studentId: 'CSE2024003',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@student.edu',
    phone: '+1234567894',
    semester: 2,
    year: 2024,
    department: 'CSE',
    batch: '2023',
    cgpa: 7.8,
    attendance: 78,
    address: '789 Pine St, City, State',
    dateOfBirth: '2001-12-10',
    gender: 'Male',
    bloodGroup: 'B+',
    emergencyContact: {
      name: 'Sarah Johnson',
      relationship: 'Sister',
      phone: '+1234567895'
    },
    isActive: true,
    enrolledDate: '2023-08-01',
    createdAt: '2023-08-01T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const semester = searchParams.get('semester')
    const batch = searchParams.get('batch')
    const department = searchParams.get('department')
    const search = searchParams.get('search')
    const isActive = searchParams.get('isActive')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredStudents = [...students]

    // Apply filters
    if (semester && semester !== 'all') {
      filteredStudents = filteredStudents.filter(student => student.semester.toString() === semester)
    }

    if (batch && batch !== 'all') {
      filteredStudents = filteredStudents.filter(student => student.batch === batch)
    }

    if (department && department !== 'all') {
      filteredStudents = filteredStudents.filter(student => student.department === department)
    }

    if (isActive !== null && isActive !== undefined) {
      filteredStudents = filteredStudents.filter(student => student.isActive === (isActive === 'true'))
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredStudents = filteredStudents.filter(student =>
        student.firstName.toLowerCase().includes(searchLower) ||
        student.lastName.toLowerCase().includes(searchLower) ||
        student.studentId.toLowerCase().includes(searchLower) ||
        student.email.toLowerCase().includes(searchLower)
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedStudents = filteredStudents.slice(startIndex, endIndex)

    return NextResponse.json({
      students: paginatedStudents,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredStudents.length / limit),
        totalStudents: filteredStudents.length,
        hasNext: endIndex < filteredStudents.length,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching students:', error)
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
      studentId,
      firstName,
      lastName,
      email,
      phone,
      semester,
      year,
      department = 'CSE',
      batch,
      address,
      dateOfBirth,
      gender,
      bloodGroup,
      emergencyContact
    } = body

    // Validate required fields
    if (!studentId || !firstName || !lastName || !email || !semester || !year) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if student ID already exists
    const existingStudent = students.find(s => s.studentId === studentId)
    if (existingStudent) {
      return NextResponse.json(
        { message: 'Student ID already exists' },
        { status: 400 }
      )
    }

    const newStudent = {
      id: students.length + 1,
      studentId,
      firstName,
      lastName,
      email,
      phone: phone || '',
      semester: parseInt(semester),
      year: parseInt(year),
      department,
      batch: batch || year.toString(),
      cgpa: 0,
      attendance: 0,
      address: address || '',
      dateOfBirth: dateOfBirth || '',
      gender: gender || '',
      bloodGroup: bloodGroup || '',
      emergencyContact: emergencyContact || {
        name: '',
        relationship: '',
        phone: ''
      },
      isActive: true,
      enrolledDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    students.push(newStudent)

    return NextResponse.json(
      { message: 'Student registered successfully', student: newStudent },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error registering student:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
