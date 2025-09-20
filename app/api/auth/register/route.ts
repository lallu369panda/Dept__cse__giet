import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, studentId, password, role, department, semester } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (role === 'student' && !studentId) {
      return NextResponse.json(
        { message: 'Student ID is required for students' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // In a real application, you would save to database here
    // For demo purposes, we'll just return success
    const userData = {
      firstName,
      lastName,
      email,
      phone,
      studentId: role === 'student' ? studentId : null,
      password: hashedPassword,
      role,
      department: department || 'CSE',
      semester: role === 'student' ? semester : null,
      createdAt: new Date().toISOString()
    }

    // Simulate database save
    console.log('User registered:', userData)

    return NextResponse.json(
      { 
        message: 'Registration successful',
        user: {
          firstName,
          lastName,
          email,
          role,
          department,
          studentId: role === 'student' ? studentId : null
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
