'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { GraduationCap, Users, Award, BookOpen, Target, Lightbulb, ChevronLeft, ChevronRight, Calendar, MapPin, Phone, Mail, ExternalLink, Star, Trophy, Code, Database, Shield, Globe } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Department photos for slideshow
  const departmentPhotos = [
    {
      src: '/api/placeholder/600/400',
      alt: 'CSE Department Building',
      title: 'Department Building',
      description: 'Modern infrastructure with state-of-the-art laboratories'
    },
    {
      src: '/api/placeholder/600/400',
      alt: 'Computer Lab',
      title: 'Advanced Computer Lab',
      description: 'High-performance computing facilities for students'
    },
    {
      src: '/api/placeholder/600/400',
      alt: 'Research Lab',
      title: 'Research Laboratory',
      description: 'Cutting-edge research environment for innovation'
    },
    {
      src: '/api/placeholder/600/400',
      alt: 'Library',
      title: 'Digital Library',
      description: 'Comprehensive collection of technical resources'
    },
    {
      src: '/api/placeholder/600/400',
      alt: 'Seminar Hall',
      title: 'Seminar Hall',
      description: 'Modern auditorium for conferences and events'
    }
  ]

  // Faculty profiles
  const facultyProfiles = [
    {
      name: 'Dr. Rajesh Kumar',
      position: 'Dean of Engineering',
      image: '/api/placeholder/200/200',
      qualifications: 'Ph.D. in Computer Science, IIT Delhi',
      experience: '20+ years',
      specialization: 'Machine Learning & AI',
      achievements: ['Published 50+ research papers', 'Recipient of Best Teacher Award', 'Industry consultant for 10+ companies']
    },
    {
      name: 'Prof. Sunita Sharma',
      position: 'Head of Department (CSE)',
      image: '/api/placeholder/200/200',
      qualifications: 'Ph.D. in Computer Engineering, Stanford University',
      experience: '18+ years',
      specialization: 'Data Science & Analytics',
      achievements: ['Led 15+ research projects', 'Mentored 100+ students', 'International conference speaker']
    },
    {
      name: 'Lallu Prasad Panda',
      position: 'Lead Developer & System Administrator',
      image: '/api/placeholder/200/200',
      qualifications: 'B.Tech CSE, Full-Stack Developer',
      experience: '5+ years',
      specialization: 'Web Development & System Design',
      achievements: ['Developed 20+ web applications', 'Open source contributor', 'Technical mentor for students']
    }
  ]

  // Department achievements
  const achievements = [
    { icon: Trophy, title: 'Best CSE Department', year: '2023', description: 'Awarded by AICTE for excellence in education' },
    { icon: Star, title: 'Research Excellence', year: '2022', description: 'Highest research output in the university' },
    { icon: Users, title: 'Industry Partnerships', year: '2023', description: 'Collaborations with 25+ tech companies' },
    { icon: Award, title: 'Student Success', year: '2023', description: '95% placement rate for graduating students' }
  ]

  // Timeline of department milestones
  const timeline = [
    { year: '2008', title: 'Department Established', description: 'CSE department founded with initial batch of 60 students' },
    { year: '2012', title: 'M.Tech Program Launch', description: 'Introduced postgraduate program in Computer Science' },
    { year: '2015', title: 'Research Center', description: 'Established dedicated research center for AI and ML' },
    { year: '2018', title: 'Industry Partnerships', description: 'Signed MoUs with major tech companies' },
    { year: '2020', title: 'Online Learning', description: 'Pioneered online education during pandemic' },
    { year: '2023', title: 'Smart Campus', description: 'Implemented IoT and smart technologies across campus' }
  ]

  const stats = [
    { icon: Users, label: 'Students', value: '500+' },
    { icon: GraduationCap, label: 'Faculty', value: '25+' },
    { icon: Award, label: 'Years of Excellence', value: '15+' },
    { icon: BookOpen, label: 'Courses', value: '50+' }
  ]

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for academic excellence and innovation in computer science education.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a strong community of learners, researchers, and industry professionals.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Fostering creativity and innovation through cutting-edge research and development.'
    }
  ]

  // Auto-play slideshow
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % departmentPhotos.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, departmentPhotos.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % departmentPhotos.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + departmentPhotos.length) % departmentPhotos.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            About Our Department
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The Computer Science and Engineering Department is committed to providing 
            world-class education and fostering innovation in technology. We prepare 
            students for the digital future through cutting-edge curriculum, 
            state-of-the-art facilities, and industry partnerships.
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Department Information */}
          <div className="space-y-8">
            {/* Mission & Vision */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="h-8 w-8 text-blue-600 mr-3" />
                Our Mission & Vision
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To provide high-quality education in computer science and engineering, 
                    preparing students for successful careers in technology while contributing 
                    to the advancement of knowledge through research and innovation.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To be a leading department in computer science education and research, 
                    recognized for producing graduates who are innovative, ethical, and 
                    ready to tackle the challenges of the digital age.
                  </p>
                </div>
              </div>
            </div>

            {/* Department Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Programs & Research */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="h-7 w-7 text-blue-600 mr-3" />
                Programs & Research
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Programs Offered</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center"><Code className="h-4 w-4 text-blue-500 mr-2" />B.Tech in CSE</li>
                    <li className="flex items-center"><Database className="h-4 w-4 text-blue-500 mr-2" />M.Tech in CSE</li>
                    <li className="flex items-center"><GraduationCap className="h-4 w-4 text-blue-500 mr-2" />Ph.D in CSE</li>
                    <li className="flex items-center"><Shield className="h-4 w-4 text-blue-500 mr-2" />PGDCA</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Research Areas</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center"><Globe className="h-4 w-4 text-purple-500 mr-2" />AI & Machine Learning</li>
                    <li className="flex items-center"><Database className="h-4 w-4 text-purple-500 mr-2" />Data Science</li>
                    <li className="flex items-center"><Shield className="h-4 w-4 text-purple-500 mr-2" />Cybersecurity</li>
                    <li className="flex items-center"><Code className="h-4 w-4 text-purple-500 mr-2" />Software Engineering</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Photo Slideshow */}
          <div className="relative">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Department Gallery
              </h2>
              
              {/* Slideshow Container */}
              <div className="relative overflow-hidden rounded-xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {departmentPhotos.map((photo, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <div className="relative">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-xl font-bold mb-1">{photo.title}</h3>
                          <p className="text-sm opacity-90">{photo.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Play/Pause Button */}
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                >
                  {isAutoPlaying ? '⏸️' : '▶️'}
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {departmentPhotos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Faculty Profiles Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {facultyProfiles.map((faculty, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center group hover:shadow-2xl transition-all duration-300">
                <div className="relative mb-4">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    {faculty.experience}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{faculty.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{faculty.position}</p>
                <p className="text-sm text-gray-600 mb-3">{faculty.qualifications}</p>
                <p className="text-sm text-purple-600 font-medium mb-4">{faculty.specialization}</p>
                <div className="space-y-1">
                  {faculty.achievements.slice(0, 2).map((achievement, idx) => (
                    <p key={idx} className="text-xs text-gray-500">• {achievement}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20 group hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <achievement.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{achievement.year}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
            <div className="space-y-8">
              {timeline.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg flex-shrink-0"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl border border-white/20 group hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="h-6 w-6" />
              <span>Engineering Block, University Campus</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Phone className="h-6 w-6" />
              <span>+91-XXX-XXXX-XXX</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Mail className="h-6 w-6" />
              <span>cse@university.edu</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
