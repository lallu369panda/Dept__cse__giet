import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding events...')

  // Clear existing events
  await prisma.event.deleteMany()

  // Seed events
  const events = [
    {
      title: 'GIET-2025 International Conference',
      description: '2025 International Conference on Next Generation of Green Information and Emerging Technologies organized by Department of Computer Science and Engineering.',
      date: new Date('2025-08-08'),
      time: '09:00 AM',
      location: 'GIET University, Gunupur',
      type: 'International Conference',
      category: 'conference',
      attendees: 300,
      maxAttendees: 500,
      image: '/images/giet-2025-conference.png',
      featured: true,
      status: 'upcoming',
      organizer: 'CSE Department, GIET University',
      contactEmail: 'giet2025@cse.edu',
      requirements: 'Open to researchers, faculty, and students'
    },
    {
      title: 'Hackathon Competition',
      description: '48-hour coding competition for students to showcase their programming skills.',
      date: new Date('2024-03-22'),
      time: '10:00 AM',
      location: 'Computer Lab 1',
      type: 'Competition',
      category: 'competition',
      attendees: 80,
      maxAttendees: 100,
      image: '/api/placeholder/800/500',
      featured: true,
      status: 'upcoming',
      organizer: 'CodeCraft Club',
      contactEmail: 'hackathon@cse.edu',
      requirements: 'Team of 2-4 members'
    },
    {
      title: 'Machine Learning Workshop',
      description: 'Hands-on workshop on machine learning algorithms and applications.',
      date: new Date('2024-03-28'),
      time: '02:00 PM',
      location: 'Seminar Hall',
      type: 'Workshop',
      category: 'workshop',
      attendees: 60,
      maxAttendees: 80,
      image: '/api/placeholder/800/500',
      featured: false,
      status: 'upcoming',
      organizer: 'Innovation Lab',
      contactEmail: 'ml-workshop@cse.edu',
      requirements: 'Basic programming knowledge'
    },
    {
      title: 'Alumni Meet 2024',
      description: 'Annual alumni gathering with networking opportunities and career guidance sessions.',
      date: new Date('2024-04-05'),
      time: '11:00 AM',
      location: 'Campus Ground',
      type: 'Networking',
      category: 'conference',
      attendees: 200,
      maxAttendees: 300,
      image: '/api/placeholder/800/500',
      featured: true,
      status: 'upcoming',
      organizer: 'Alumni Association',
      contactEmail: 'alumni@cse.edu',
      requirements: 'Open to all'
    },
    {
      title: 'Coding Contest Finals',
      description: 'Final round of the annual coding competition with exciting prizes.',
      date: new Date('2024-04-18'),
      time: '10:00 AM',
      location: 'Computer Lab 2',
      type: 'Competition',
      category: 'competition',
      attendees: 0,
      maxAttendees: 50,
      image: '/api/placeholder/800/500',
      featured: false,
      status: 'upcoming',
      organizer: 'Programming Club',
      contactEmail: 'programming@cse.edu',
      requirements: 'Qualified from preliminary rounds'
    },
    {
      title: 'Guest Lecture Series',
      description: 'Industry experts sharing insights on latest technology trends.',
      date: new Date('2024-04-25'),
      time: '03:00 PM',
      location: 'Main Auditorium',
      type: 'Lecture',
      category: 'workshop',
      attendees: 0,
      maxAttendees: 200,
      image: '/api/placeholder/800/500',
      featured: false,
      status: 'upcoming',
      organizer: 'Industry Relations Cell',
      contactEmail: 'industry@cse.edu',
      requirements: 'Open to all students'
    },
    {
      title: 'Project Exhibition',
      description: 'Annual showcase of student projects across all semesters.',
      date: new Date('2024-05-02'),
      time: '10:00 AM',
      location: 'Exhibition Hall',
      type: 'Exhibition',
      category: 'conference',
      attendees: 0,
      maxAttendees: 500,
      image: '/api/placeholder/800/500',
      featured: true,
      status: 'upcoming',
      organizer: 'Academic Committee',
      contactEmail: 'projects@cse.edu',
      requirements: 'Project submission required'
    }
  ]

  for (const event of events) {
    const createdEvent = await prisma.event.create({
      data: event
    })
    console.log(`Created event: ${createdEvent.title}`)
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })