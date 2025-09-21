'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Users, Calendar, FileText, BarChart3, Shield } from 'lucide-react'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  const features = [
    { icon: BookOpen, title: 'ERP Integration', description: 'Access student records and academic data' },
    { icon: BarChart3, title: 'Result Checking', description: 'View and download your academic results' },
    { icon: FileText, title: 'Question Papers', description: 'Download previous year question papers' },
    { icon: Calendar, title: 'Events & Notices', description: 'Stay updated with department activities' },
    { icon: Users, title: 'Student Community', description: 'Connect with your fellow students' },
    { icon: Shield, title: 'Secure Access', description: 'Protected with modern authentication' },
  ]

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 fade-in px-2">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              CSE Department Portal
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto fade-in px-4">
            A centralized platform for students to access 
            academic resources, manage records, and stay connected with departmental activities.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 fade-in px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for results, notices, or resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-12 text-base sm:text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
              />
              <button className="absolute right-2 top-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in px-4">
            <Link
              href="/auth/login"
              className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 card-hover"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl mx-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Academic Resources</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Question Papers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Events This Year</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
