import { NextRequest, NextResponse } from 'next/server'

// Mock data - In production, this would come from a database
const statistics = {
  students: {
    total: 500,
    active: 480,
    graduated: 1200,
    bySemester: {
      1: 60,
      2: 65,
      3: 70,
      4: 75,
      5: 80,
      6: 85,
      7: 90,
      8: 95
    },
    byGender: {
      male: 300,
      female: 200
    },
    averageCGPA: 8.2,
    averageAttendance: 85
  },
  faculty: {
    total: 25,
    active: 24,
    byDesignation: {
      'Professor': 5,
      'Associate Professor': 8,
      'Assistant Professor': 10,
      'Lecturer': 2
    },
    averageExperience: 15,
    totalPublications: 150,
    researchProjects: 25
  },
  academic: {
    totalSubjects: 50,
    totalCourses: 8,
    averageClassSize: 30,
    passPercentage: 92,
    placementRate: 95
  },
  events: {
    totalEvents: 45,
    upcomingEvents: 12,
    completedEvents: 33,
    byType: {
      'Conference': 8,
      'Workshop': 15,
      'Competition': 10,
      'Cultural': 7,
      'Other': 5
    }
  },
  resources: {
    questionPapers: 120,
    notes: 80,
    books: 500,
    journals: 150,
    totalDownloads: 5000
  },
  clubs: {
    total: 6,
    active: 6,
    totalMembers: 560,
    averageMembersPerClub: 93
  },
  achievements: {
    awards: 15,
    publications: 150,
    patents: 8,
    researchGrants: 12
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (type) {
      // Return specific statistics
      if (statistics[type as keyof typeof statistics]) {
        return NextResponse.json({
          type,
          data: statistics[type as keyof typeof statistics]
        })
      } else {
        return NextResponse.json(
          { message: 'Invalid statistics type' },
          { status: 400 }
        )
      }
    }

    // Return all statistics
    return NextResponse.json({
      statistics,
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'
