import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

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

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Check if student ID already exists (for students)
    if (role === 'student' && studentId) {
      const existingStudentId = await prisma.user.findUnique({
        where: { studentId }
      })

      if (existingStudentId) {
        return NextResponse.json(
          { message: 'Student ID already exists' },
          { status: 400 }
        )
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Save user to database
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        role: 'student', // Only students allowed
        department: department || 'CSE',
        studentId: studentId,
        semester: semester
      }
    })

    console.log('User registered in database:', {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    })

    return NextResponse.json(
      { 
        message: 'Registration successful',
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          department: user.department,
          studentId: user.studentId
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
