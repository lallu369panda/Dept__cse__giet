'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useEvents } from '@/hooks/useEvents'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Star,
  Trophy,
  Code,
  Palette,
  Camera,
  Music,
  BookOpen,
  Zap,
  Target,
  Award,
  ExternalLink,
  Filter,
  Search
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function EventsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Get real-time events data
  const { events, upcomingEvents, stats, loading } = useEvents()

  // Featured events for slideshow (use real data)
  const featuredEvents = upcomingEvents.slice(0, 5) // Show first 5 upcoming events
  const eventPhotos = featuredEvents.length > 0 ? featuredEvents.map(event => ({
    src: event.image || '/api/placeholder/800/500',
    alt: event.title,
    title: event.title,
    description: event.description,
    date: new Date(event.date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    attendees: `${event.maxAttendees || 100}+`,
    type: event.type
  })) : [
    {
      src: '/images/giet-2025-conference.png',
      alt: 'GIET Events',
      title: 'Exciting Events Coming Soon',
      description: 'Stay tuned for upcoming events and activities from the Department of Computer Science and Engineering',
      date: 'Coming Soon',
      attendees: 'Open to All',
      type: 'Department Events'
    }
  ]

  // Clubs with logos and descriptions
  const clubs = [
    {
      name: 'CodeCraft Club',
      logo: '/api/placeholder/100/100',
      description: 'Programming and software development enthusiasts',
      members: '150+',
      founded: '2018',
      activities: ['Weekly coding sessions', 'Hackathons', 'Open source projects'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Design Studio',
      logo: '/api/placeholder/100/100',
      description: 'UI/UX design and creative arts community',
      members: '80+',
      founded: '2019',
      activities: ['Design workshops', 'Portfolio reviews', 'Creative competitions'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Photo Society',
      logo: '/api/placeholder/100/100',
      description: 'Photography and visual storytelling group',
      members: '60+',
      founded: '2020',
      activities: ['Photo walks', 'Exhibitions', 'Technical workshops'],
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Music Club',
      logo: '/api/placeholder/100/100',
      description: 'Musical talents and performance arts',
      members: '90+',
      founded: '2017',
      activities: ['Concerts', 'Music production', 'Cultural events'],
      color: 'from-green-500 to-teal-500'
    },
    {
      name: 'Literary Society',
      logo: '/api/placeholder/100/100',
      description: 'Writing, poetry, and literary discussions',
      members: '70+',
      founded: '2016',
      activities: ['Poetry sessions', 'Writing workshops', 'Book clubs'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'Innovation Lab',
      logo: '/api/placeholder/100/100',
      description: 'Research and innovation in technology',
      members: '110+',
      founded: '2015',
      activities: ['Research projects', 'Patent filing', 'Tech incubator'],
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  // Event categories
  const categories = [
    { id: 'all', name: 'All Events', icon: Calendar },
    { id: 'conference', name: 'Conferences', icon: Users },
    { id: 'workshop', name: 'Workshops', icon: BookOpen },
    { id: 'competition', name: 'Competitions', icon: Trophy },
    { id: 'exhibition', name: 'Exhibitions', icon: Camera },
    { id: 'cultural', name: 'Cultural', icon: Music }
  ]

  // Map event categories to database types
  const getCategoryForEvent = (event: any) => {
    const title = event.title.toLowerCase()
    const description = event.description.toLowerCase()
    const type = event.type?.toLowerCase() || ''
    
    if (title.includes('conference') || type.includes('conference')) return 'conference'
    if (title.includes('workshop') || type.includes('workshop') || description.includes('workshop')) return 'workshop'
    if (title.includes('competition') || title.includes('hackathon') || type.includes('competition')) return 'competition'
    if (title.includes('exhibition') || title.includes('showcase') || type.includes('exhibition')) return 'exhibition'
    if (title.includes('cultural') || title.includes('music') || title.includes('dance') || type.includes('cultural')) return 'cultural'
    return 'conference' // default category
  }

  // Filter events based on category and search term
  const filteredEvents = events.filter(event => {
    const eventCategory = getCategoryForEvent(event)
    const matchesCategory = selectedCategory === 'all' || eventCategory === selectedCategory
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Auto-play slideshow
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % eventPhotos.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, eventPhotos.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % eventPhotos.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + eventPhotos.length) % eventPhotos.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Events & Activities
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover exciting events, join vibrant clubs, and be part of our dynamic 
            computer science community. From technical workshops to cultural celebrations, 
            there's always something happening!
          </p>
        </div>

        {/* Featured Events Slideshow */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Featured Events
          </h2>
          
          <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {/* Slideshow Container */}
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {eventPhotos.map((photo, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="relative h-96 md:h-[500px]">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <div className="max-w-4xl mx-auto">
                          <div className="flex items-center mb-4">
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mr-4">
                              {photo.type}
                            </span>
                            <div className="flex items-center text-sm">
                              <Users className="h-4 w-4 mr-1" />
                              {photo.attendees} attendees
                            </div>
                          </div>
                          <h3 className="text-3xl md:text-4xl font-bold mb-4">{photo.title}</h3>
                          <p className="text-lg md:text-xl mb-4 opacity-90 max-w-2xl">{photo.description}</p>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            {photo.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Play/Pause Button */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 shadow-lg transition-all duration-300"
              >
                {isAutoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center py-6 space-x-3">
              {eventPhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-xl transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <category.icon className="h-4 w-4 mr-2" />
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            All Events ({loading ? '...' : filteredEvents.length})
          </h2>
          
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-500 text-lg">Loading events...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'No events are currently scheduled. Check back soon!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => {
                const isUpcoming = new Date(event.date) > new Date()
                return (
                  <div key={event.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden group hover:shadow-2xl transition-all duration-300">
                    <div className="relative">
                      <img
                        src={event.image || '/api/placeholder/400/250'}
                        alt={event.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isUpcoming && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          Upcoming
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {event.type}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          {new Date(event.date).toLocaleTimeString('en-US', { 
                            hour: 'numeric', 
                            minute: '2-digit' 
                          })}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-2" />
                          Max {event.maxAttendees || 100} participants
                        </div>
                      </div>
                      
                      <button className={`w-full py-3 rounded-xl transition-all duration-200 flex items-center justify-center group ${
                        isUpcoming 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600' 
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}>
                        {isUpcoming ? 'Register Now' : 'Event Completed'}
                        {isUpcoming && <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Clubs Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Our Clubs & Societies
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Join our vibrant community of clubs and societies. Each club offers unique opportunities 
            to learn, grow, and connect with like-minded peers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubs.map((club, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 group hover:shadow-2xl transition-all duration-300">
                <div className="text-center mb-6">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${club.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <img
                      src={club.logo}
                      alt={club.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{club.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{club.description}</p>
                  
                  <div className="flex justify-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {club.members}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Since {club.founded}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-gray-900 text-sm">Activities:</h4>
                  {club.activities.map((activity, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${club.color} mr-3`}></div>
                      {activity}
                    </div>
                  ))}
                </div>
                
                <button className={`w-full bg-gradient-to-r ${club.color} text-white py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center group`}>
                  Join Club
                  <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        {!loading && (
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-indigo-600 mb-2">{stats.totalEvents}</div>
                <div className="text-gray-600">Total Events</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.upcomingEvents}</div>
                <div className="text-gray-600">Upcoming Events</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">{stats.completedEvents}</div>
                <div className="text-gray-600">Completed Events</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">6</div>
                <div className="text-gray-600">Active Clubs</div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Involved?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join our community and be part of exciting events, workshops, and activities. 
            Your journey in computer science starts here!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center">
              <Calendar className="h-5 w-5 mr-2" />
              View Event Calendar
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors duration-200 flex items-center justify-center">
              <Users className="h-5 w-5 mr-2" />
              Join a Club
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
