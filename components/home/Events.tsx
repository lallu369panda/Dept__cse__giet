'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useEvents, eventNotifier } from '@/hooks/useEvents'
import { Calendar, MapPin, Clock, Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: string
  category: string
  attendees: number
  maxAttendees?: number
  image?: string
  featured: boolean
  status: string
  organizer: string
  contactEmail: string
  requirements?: string
  createdAt: string
  updatedAt: string
}

export default function Events() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const { featuredEvents: events, upcomingEvents, loading, error, refreshEvents } = useEvents()

  // Subscribe to event updates
  useEffect(() => {
    const unsubscribe = eventNotifier.subscribe(() => {
      // This will trigger a refresh when events are updated from admin
      refreshEvents()
    })

    return unsubscribe
  }, [refreshEvents])

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % events.length)
  }

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + events.length) % events.length)
  }

  const currentEvent = events[currentEventIndex]

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </section>
    )
  }

  if (events.length === 0) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Department Events
          </h2>
          <p className="text-xl text-gray-600">No events available at the moment.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Department Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest events, workshops, and activities
          </p>
        </div>

        {/* Featured Event Carousel */}
        <div className="mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            <div className="relative">
              <div className="aspect-video relative overflow-hidden">
                {currentEvent.image && currentEvent.image !== '/api/placeholder/400/250' ? (
                  <>
                    <Image
                      src={currentEvent.image}
                      alt={currentEvent.title}
                      fill
                      className="object-cover"
                      priority={currentEventIndex === 0}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/800x450/3B82F6/FFFFFF/png?text=Event+Image';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-center text-white p-8">
                        <h3 className="text-3xl font-bold mb-4">{currentEvent.title}</h3>
                        <p className="text-xl mb-6">{currentEvent.description}</p>
                        <div className="flex flex-wrap justify-center gap-6 text-lg">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2" />
                            {new Date(currentEvent.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2" />
                            {currentEvent.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 mr-2" />
                            {currentEvent.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-5 w-5 mr-2" />
                            {currentEvent.attendees} attendees
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center h-full">
                    <div className="text-center text-white p-8">
                      <h3 className="text-3xl font-bold mb-4">{currentEvent.title}</h3>
                      <p className="text-xl mb-6">{currentEvent.description}</p>
                      <div className="flex flex-wrap justify-center gap-6 text-lg">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2" />
                          {new Date(currentEvent.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2" />
                          {currentEvent.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 mr-2" />
                          {currentEvent.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-5 w-5 mr-2" />
                          {currentEvent.attendees} attendees
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevEvent}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextEvent}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-center">
                <div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {currentEvent.type}
                  </span>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
                  Register Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div>
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
              View All Events
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-left">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3" />
                  <div>
                    <div className="font-semibold">View Event Calendar</div>
                    <div className="text-sm opacity-90">See all scheduled events</div>
                  </div>
                </div>
              </button>
              <button className="w-full p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 text-left">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-3" />
                  <div>
                    <div className="font-semibold">Join Workshop</div>
                    <div className="text-sm opacity-90">Register for upcoming workshops</div>
                  </div>
                </div>
              </button>
              <button className="w-full p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 text-left">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3" />
                  <div>
                    <div className="font-semibold">Event Locations</div>
                    <div className="text-sm opacity-90">Find event venues</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
