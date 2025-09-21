import { NextRequest, NextResponse } from 'next/server'

// Mock data - In production, this would come from a database
let faculty = [
  {
    id: 1,
    employeeId: 'FAC001',
    firstName: 'Dr. Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@faculty.edu',
    phone: '+1234567801',
    department: 'CSE',
    designation: 'Professor',
    specialization: 'Machine Learning & AI',
    qualifications: 'Ph.D. in Computer Science, IIT Delhi',
    experience: 20,
    joiningDate: '2010-08-01',
    salary: 120000,
    address: '123 Faculty Lane, City, State',
    dateOfBirth: '1975-03-15',
    gender: 'Male',
    bloodGroup: 'A+',
    emergencyContact: {
      name: 'Mrs. Rajesh Kumar',
      relationship: 'Spouse',
      phone: '+1234567802'
    },
    subjects: ['Data Structures', 'Machine Learning', 'AI'],
    researchAreas: ['Deep Learning', 'Computer Vision', 'NLP'],
    publications: 25,
    isActive: true,
    createdAt: '2010-08-01T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    employeeId: 'FAC002',
    firstName: 'Prof. Sunita',
    lastName: 'Sharma',
    email: 'sunita.sharma@faculty.edu',
    phone: '+1234567803',
    department: 'CSE',
    designation: 'Associate Professor',
    specialization: 'Data Science & Analytics',
    qualifications: 'Ph.D. in Computer Engineering, Stanford University',
    experience: 18,
    joiningDate: '2012-01-15',
    salary: 100000,
    address: '456 Academic Ave, City, State',
    dateOfBirth: '1978-07-20',
    gender: 'Female',
    bloodGroup: 'B+',
    emergencyContact: {
      name: 'Mr. Sunita Sharma',
      relationship: 'Spouse',
      phone: '+1234567804'
    },
    subjects: ['Database Management', 'Data Mining', 'Big Data'],
    researchAreas: ['Data Analytics', 'Business Intelligence', 'Data Warehousing'],
    publications: 18,
    isActive: true,
    createdAt: '2012-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 3,
    employeeId: 'FAC003',
    firstName: 'Dr. Amit',
    lastName: 'Singh',
    email: 'amit.singh@faculty.edu',
    phone: '+1234567805',
    department: 'CSE',
    designation: 'Assistant Professor',
    specialization: 'Operating Systems',
    qualifications: 'Ph.D. in Computer Science, MIT',
    experience: 12,
    joiningDate: '2018-06-01',
    salary: 85000,
    address: '789 Scholar St, City, State',
    dateOfBirth: '1985-11-10',
    gender: 'Male',
    bloodGroup: 'O+',
    emergencyContact: {
      name: 'Mrs. Amit Singh',
      relationship: 'Spouse',
      phone: '+1234567806'
    },
    subjects: ['Operating Systems', 'Computer Networks', 'System Programming'],
    researchAreas: ['Distributed Systems', 'Cloud Computing', 'Security'],
    publications: 12,
    isActive: true,
    createdAt: '2018-06-01T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const designation = searchParams.get('designation')
    const department = searchParams.get('department')
    const specialization = searchParams.get('specialization')
    const search = searchParams.get('search')
    const isActive = searchParams.get('isActive')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredFaculty = [...faculty]

    // Apply filters
    if (designation && designation !== 'all') {
      filteredFaculty = filteredFaculty.filter(f => f.designation === designation)
    }

    if (department && department !== 'all') {
      filteredFaculty = filteredFaculty.filter(f => f.department === department)
    }

    if (specialization && specialization !== 'all') {
      filteredFaculty = filteredFaculty.filter(f => 
        f.specialization.toLowerCase().includes(specialization.toLowerCase())
      )
    }

    if (isActive !== null && isActive !== undefined) {
      filteredFaculty = filteredFaculty.filter(f => f.isActive === (isActive === 'true'))
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredFaculty = filteredFaculty.filter(f =>
        f.firstName.toLowerCase().includes(searchLower) ||
        f.lastName.toLowerCase().includes(searchLower) ||
        f.employeeId.toLowerCase().includes(searchLower) ||
        f.email.toLowerCase().includes(searchLower) ||
        f.specialization.toLowerCase().includes(searchLower)
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedFaculty = filteredFaculty.slice(startIndex, endIndex)

    return NextResponse.json({
      faculty: paginatedFaculty,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredFaculty.length / limit),
        totalFaculty: filteredFaculty.length,
        hasNext: endIndex < filteredFaculty.length,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching faculty:', error)
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
      employeeId,
      firstName,
      lastName,
      email,
      phone,
      department = 'CSE',
      designation,
      specialization,
      qualifications,
      experience,
      address,
      dateOfBirth,
      gender,
      bloodGroup,
      emergencyContact,
      subjects = [],
      researchAreas = []
    } = body

    // Validate required fields
    if (!employeeId || !firstName || !lastName || !email || !designation || !specialization) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if employee ID already exists
    const existingFaculty = faculty.find(f => f.employeeId === employeeId)
    if (existingFaculty) {
      return NextResponse.json(
        { message: 'Employee ID already exists' },
        { status: 400 }
      )
    }

    const newFaculty = {
      id: faculty.length + 1,
      employeeId,
      firstName,
      lastName,
      email,
      phone: phone || '',
      department,
      designation,
      specialization,
      qualifications: qualifications || '',
      experience: parseInt(experience) || 0,
      joiningDate: new Date().toISOString().split('T')[0],
      salary: 0, // Will be set by admin
      address: address || '',
      dateOfBirth: dateOfBirth || '',
      gender: gender || '',
      bloodGroup: bloodGroup || '',
      emergencyContact: emergencyContact || {
        name: '',
        relationship: '',
        phone: ''
      },
      subjects: Array.isArray(subjects) ? subjects : [],
      researchAreas: Array.isArray(researchAreas) ? researchAreas : [],
      publications: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    faculty.push(newFaculty)

    return NextResponse.json(
      { message: 'Faculty member added successfully', faculty: newFaculty },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error adding faculty member:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
