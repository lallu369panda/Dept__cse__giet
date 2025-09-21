import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, semester, linkedin, github } = body

    // Validation
    if (!name || !semester) {
      return NextResponse.json(
        { error: 'Name and semester are required' },
        { status: 400 }
      )
    }

    // Set default values if social media links are empty
    const linkedinUrl = linkedin?.trim() || 'https://linkedin.com/in/your-profile'
    const githubUrl = github?.trim() || 'https://github.com/your-username'

    // Split the name into first and last name
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || firstName

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        firstName,
        lastName,
        semester,
        linkedin: linkedinUrl,
        github: githubUrl
      }
    })

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        name: `${updatedUser.firstName} ${updatedUser.lastName}`,
        semester: updatedUser.semester,
        email: updatedUser.email
      }
    })

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}