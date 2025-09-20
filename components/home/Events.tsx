'use client'

import { useState } from 'react'
import { Calendar, MapPin, Clock, Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Events() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0)

  const events = [
    {
      id: 1,
      title: 'Tech Symposium 2024',
      date: '2024-03-15',
      time: '09:00 AM',
      location: 'Main Auditorium',
      description: 'Annual technical symposium featuring latest innovations in computer science and engineering.',
      attendees: 150,
      type: 'Conference',
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      title: 'Hackathon Competition',
      date: '2024-03-22',
      time: '10:00 AM',
      location: 'Computer Lab 1',
      description: '48-hour coding competition for students to showcase their programming skills.',
      attendees: 80,
      type: 'Competition',
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      title: 'Industry Workshop',
      date: '2024-03-28',
      time: '02:00 PM',
      location: 'Seminar Hall',
      description: 'Workshop on emerging technologies with industry experts and hands-on sessions.',
      attendees: 60,
      type: 'Workshop',
      image: '/api/placeholder/400/250'
    },
    {
      id: 4,
      title: 'Alumni Meet 2024',
      date: '2024-04-05',
      time: '11:00 AM',
      location: 'Campus Ground',
      description: 'Annual alumni gathering with networking opportunities and career guidance sessions.',
      attendees: 200,
      type: 'Networking',
      image: '/api/placeholder/400/250'
    }
  ]

  const upcomingEvents = [
    {
      title: 'Machine Learning Workshop',
      date: '2024-04-12',
      type: 'Workshop'
    },
    {
      title: 'Coding Contest Finals',
      date: '2024-04-18',
      type: 'Competition'
    },
    {
      title: 'Guest Lecture Series',
      date: '2024-04-25',
      type: 'Lecture'
    },
    {
      title: 'Project Exhibition',
      date: '2024-05-02',
      type: 'Exhibition'
    }
  ]

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % events.length)
  }

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + events.length) % events.length)
  }

  const currentEvent = events[currentEventIndex]

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
              <div className="aspect-video bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
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
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
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
