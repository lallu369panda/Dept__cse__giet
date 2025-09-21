import { NextRequest, NextResponse } from 'next/server'

// Mock data - In production, this would come from a database
let clubs = [
  {
    id: 1,
    name: 'CodeCraft Club',
    description: 'Programming and software development enthusiasts',
    logo: '/api/placeholder/100/100',
    members: 150,
    founded: '2018',
    president: 'John Doe',
    vicePresident: 'Jane Smith',
    activities: ['Weekly coding sessions', 'Hackathons', 'Open source projects'],
    color: 'from-blue-500 to-cyan-500',
    contactEmail: 'codecraft@cse.edu',
    socialLinks: {
      github: 'https://github.com/codecraft-club',
      discord: 'https://discord.gg/codecraft',
      instagram: 'https://instagram.com/codecraft_club'
    },
    isActive: true,
    createdAt: '2018-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'Design Studio',
    description: 'UI/UX design and creative arts community',
    logo: '/api/placeholder/100/100',
    members: 80,
    founded: '2019',
    president: 'Alice Johnson',
    vicePresident: 'Bob Wilson',
    activities: ['Design workshops', 'Portfolio reviews', 'Creative competitions'],
    color: 'from-purple-500 to-pink-500',
    contactEmail: 'design@cse.edu',
    socialLinks: {
      behance: 'https://behance.net/design-studio',
      instagram: 'https://instagram.com/design_studio',
      dribbble: 'https://dribbble.com/design-studio'
    },
    isActive: true,
    createdAt: '2019-03-20T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 3,
    name: 'Photo Society',
    description: 'Photography and visual storytelling group',
    logo: '/api/placeholder/100/100',
    members: 60,
    founded: '2020',
    president: 'Charlie Brown',
    vicePresident: 'Diana Prince',
    activities: ['Photo walks', 'Exhibitions', 'Technical workshops'],
    color: 'from-orange-500 to-red-500',
    contactEmail: 'photo@cse.edu',
    socialLinks: {
      instagram: 'https://instagram.com/photo_society',
      flickr: 'https://flickr.com/photos/photo-society',
      youtube: 'https://youtube.com/photosociety'
    },
    isActive: true,
    createdAt: '2020-06-10T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 4,
    name: 'Music Club',
    description: 'Musical talents and performance arts',
    logo: '/api/placeholder/100/100',
    members: 90,
    founded: '2017',
    president: 'Eve Adams',
    vicePresident: 'Frank Miller',
    activities: ['Concerts', 'Music production', 'Cultural events'],
    color: 'from-green-500 to-teal-500',
    contactEmail: 'music@cse.edu',
    socialLinks: {
      youtube: 'https://youtube.com/music-club',
      soundcloud: 'https://soundcloud.com/music-club',
      instagram: 'https://instagram.com/music_club'
    },
    isActive: true,
    createdAt: '2017-09-05T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 5,
    name: 'Literary Society',
    description: 'Writing, poetry, and literary discussions',
    logo: '/api/placeholder/100/100',
    members: 70,
    founded: '2016',
    president: 'Grace Lee',
    vicePresident: 'Henry Davis',
    activities: ['Poetry sessions', 'Writing workshops', 'Book clubs'],
    color: 'from-indigo-500 to-purple-500',
    contactEmail: 'literary@cse.edu',
    socialLinks: {
      medium: 'https://medium.com/literary-society',
      instagram: 'https://instagram.com/literary_society',
      twitter: 'https://twitter.com/literary_society'
    },
    isActive: true,
    createdAt: '2016-11-12T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 6,
    name: 'Innovation Lab',
    description: 'Research and innovation in technology',
    logo: '/api/placeholder/100/100',
    members: 110,
    founded: '2015',
    president: 'Ivy Chen',
    vicePresident: 'Jack Taylor',
    activities: ['Research projects', 'Patent filing', 'Tech incubator'],
    color: 'from-yellow-500 to-orange-500',
    contactEmail: 'innovation@cse.edu',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/innovation-lab',
      github: 'https://github.com/innovation-lab',
      twitter: 'https://twitter.com/innovation_lab'
    },
    isActive: true,
    createdAt: '2015-08-20T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const isActive = searchParams.get('isActive')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredClubs = [...clubs]

    // Apply filters
    if (search) {
      const searchLower = search.toLowerCase()
      filteredClubs = filteredClubs.filter(club =>
        club.name.toLowerCase().includes(searchLower) ||
        club.description.toLowerCase().includes(searchLower) ||
        club.activities.some(activity => activity.toLowerCase().includes(searchLower))
      )
    }

    if (isActive !== null && isActive !== undefined) {
      filteredClubs = filteredClubs.filter(club => club.isActive === (isActive === 'true'))
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedClubs = filteredClubs.slice(startIndex, endIndex)

    return NextResponse.json({
      clubs: paginatedClubs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredClubs.length / limit),
        totalClubs: filteredClubs.length,
        hasNext: endIndex < filteredClubs.length,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching clubs:', error)
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
      name,
      description,
      logo,
      president,
      vicePresident,
      activities = [],
      color,
      contactEmail,
      socialLinks = {}
    } = body

    // Validate required fields
    if (!name || !description || !president || !contactEmail) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newClub = {
      id: clubs.length + 1,
      name,
      description,
      logo: logo || '/api/placeholder/100/100',
      members: 0,
      founded: new Date().getFullYear().toString(),
      president,
      vicePresident: vicePresident || '',
      activities: Array.isArray(activities) ? activities : [],
      color: color || 'from-gray-500 to-slate-500',
      contactEmail,
      socialLinks: typeof socialLinks === 'object' ? socialLinks : {},
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    clubs.push(newClub)

    return NextResponse.json(
      { message: 'Club created successfully', club: newClub },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating club:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
