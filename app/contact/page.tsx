'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  MessageCircle, 
  Users, 
  Code, 
  BookOpen, 
  Bug, 
  ExternalLink,
  Send,
  CheckCircle,
  Star,
  Award,
  GraduationCap,
  Building,
  Navigation,
  Share2,
  Copy,
  Download
} from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [copiedText, setCopiedText] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  })

  // College contact information
  const collegeInfo = {
    name: 'Gandhi Institute of Engineering and Technology University (GIETU)',
    shortName: 'GIETU',
    address: 'Gunupur, Rayagada, Odisha - 765022',
    fullAddress: 'Gandhi Institute of Engineering and Technology University, Gunupur, Rayagada District, Odisha, India - 765022',
    phone: '+91-XXXX-XXXX-XX',
    email: 'info@gietuniversity.edu.in',
    website: 'https://www.gietuniversity.edu.in',
    established: '1997',
    type: 'Private University',
    accreditation: 'NAAC Accredited',
    location: {
      latitude: 19.0790,
      longitude: 83.8080
    }
  }

  // Department contact information
  const departmentInfo = {
    name: 'Computer Science and Engineering Department',
    hod: 'Prof. Dr. Sunita Sharma',
    hodPhone: '+91-XXXX-XXXX-XX',
    hodEmail: 'hod.cse@gietuniversity.edu.in',
    officePhone: '+91-XXXX-XXXX-XX',
    officeEmail: 'cse@gietuniversity.edu.in',
    location: 'CSE Block, 2nd Floor, GIETU Campus',
    workingHours: '9:00 AM - 5:00 PM (Monday to Friday)'
  }

  // Developer contacts for different issues
  const developers = [
    {
      id: 1,
      name: 'Lallu Prasad Panda',
      role: 'Lead Developer & System Administrator',
      specialization: 'Technical Issues & System Maintenance',
      email: 'lallu.panda@gietuniversity.edu.in',
      phone: '+91-XXXX-XXXX-XX',
      whatsapp: '+91-XXXX-XXXX-XX',
      github: 'https://github.com/lallu-panda',
      linkedin: 'https://linkedin.com/in/lallu-panda',
      expertise: ['Full-Stack Development', 'System Administration', 'Database Management', 'API Development'],
      availability: '9:00 AM - 6:00 PM (Monday to Saturday)',
      responseTime: 'Within 2 hours',
      avatar: '/api/placeholder/100/100'
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      role: 'Technical Lead & Faculty Coordinator',
      specialization: 'Notes & Academic Content Issues',
      email: 'rajesh.kumar@gietuniversity.edu.in',
      phone: '+91-XXXX-XXXX-XX',
      whatsapp: '+91-XXXX-XXXX-XX',
      github: 'https://github.com/rajesh-kumar',
      linkedin: 'https://linkedin.com/in/rajesh-kumar',
      expertise: ['Academic Content', 'Course Materials', 'Question Papers', 'Notes Management'],
      availability: '10:00 AM - 4:00 PM (Monday to Friday)',
      responseTime: 'Within 4 hours',
      avatar: '/api/placeholder/100/100'
    },
    {
      id: 3,
      name: 'Amit Kumar Singh',
      role: 'Senior Developer & Technical Support',
      specialization: 'Technical Issues & Bug Fixes',
      email: 'amit.singh@gietuniversity.edu.in',
      phone: '+91-XXXX-XXXX-XX',
      whatsapp: '+91-XXXX-XXXX-XX',
      github: 'https://github.com/amit-singh',
      linkedin: 'https://linkedin.com/in/amit-singh',
      expertise: ['Bug Fixes', 'Performance Optimization', 'Security Issues', 'Mobile Development'],
      availability: '9:00 AM - 7:00 PM (Monday to Saturday)',
      responseTime: 'Within 1 hour',
      avatar: '/api/placeholder/100/100'
    }
  ]

  // WhatsApp groups
  const whatsappGroups = [
    {
      name: 'CSE Department Official',
      description: 'Official group for CSE department announcements and updates',
      link: 'https://chat.whatsapp.com/XXXXXXXXXXXX',
      members: '500+',
      type: 'Official',
      icon: '🎓'
    },
    {
      name: 'CSE Students Community',
      description: 'Student community for discussions, notes sharing, and peer support',
      link: 'https://chat.whatsapp.com/XXXXXXXXXXXX',
      members: '800+',
      type: 'Student',
      icon: '👨‍🎓'
    },
    {
      name: 'CSE Technical Support',
      description: 'Technical support group for website issues and technical queries',
      link: 'https://chat.whatsapp.com/XXXXXXXXXXXX',
      members: '200+',
      type: 'Support',
      icon: '🔧'
    },
    {
      name: 'CSE Alumni Network',
      description: 'Alumni network for career guidance and networking opportunities',
      link: 'https://chat.whatsapp.com/XXXXXXXXXXXX',
      members: '300+',
      type: 'Alumni',
      icon: '🌟'
    }
  ]

  // Quick contact methods
  const quickContacts = [
    {
      title: 'Emergency Contact',
      phone: '+91-XXXX-XXXX-XX',
      available: '24/7',
      description: 'For urgent academic or technical issues'
    },
    {
      title: 'Admission Enquiry',
      phone: '+91-XXXX-XXXX-XX',
      available: '9:00 AM - 5:00 PM',
      description: 'For admission related queries'
    },
    {
      title: 'Placement Cell',
      phone: '+91-XXXX-XXXX-XX',
      available: '10:00 AM - 4:00 PM',
      description: 'For placement and career guidance'
    },
    {
      title: 'Library Support',
      phone: '+91-XXXX-XXXX-XX',
      available: '8:00 AM - 8:00 PM',
      description: 'For library resources and digital access'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      category: 'general'
    })
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(''), 2000)
  }

  const openWhatsApp = (phone: string, message: string = '') => {
    const url = `https://wa.me/${phone.replace(/\D/g, '')}${message ? `?text=${encodeURIComponent(message)}` : ''}`
    window.open(url, '_blank')
  }

  const openMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${collegeInfo.location.latitude},${collegeInfo.location.longitude}`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Get in touch with our CSE department team. We're here to help with technical issues, 
            academic queries, and provide support for all your needs.
          </p>
        </div>

        {/* College Information Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{collegeInfo.name}</h2>
            <p className="text-lg text-gray-600">{collegeInfo.shortName}</p>
            <div className="flex items-center justify-center mt-4 space-x-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {collegeInfo.accreditation}
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Est. {collegeInfo.established}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-sm text-gray-600">{collegeInfo.address}</p>
              <button
                onClick={openMap}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center"
              >
                <Navigation className="h-4 w-4 mr-1" />
                View on Map
              </button>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-sm text-gray-600">{collegeInfo.phone}</p>
              <button
                onClick={() => copyToClipboard(collegeInfo.phone, 'phone')}
                className="mt-2 text-green-600 hover:text-green-800 text-sm font-medium"
              >
                {copiedText === 'phone' ? <CheckCircle className="h-4 w-4 mx-auto" /> : 'Copy'}
              </button>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <Mail className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-sm text-gray-600">{collegeInfo.email}</p>
              <button
                onClick={() => copyToClipboard(collegeInfo.email, 'email')}
                className="mt-2 text-purple-600 hover:text-purple-800 text-sm font-medium"
              >
                {copiedText === 'email' ? <CheckCircle className="h-4 w-4 mx-auto" /> : 'Copy'}
              </button>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
              <Globe className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Website</h3>
              <p className="text-sm text-gray-600">Official Website</p>
              <a
                href={collegeInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-orange-600 hover:text-orange-800 text-sm font-medium flex items-center justify-center"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Visit
              </a>
            </div>
          </div>
        </div>

        {/* Department Information */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            CSE Department Contact
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Head of Department</h3>
                  <p className="text-gray-600">{departmentInfo.hod}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {departmentInfo.hodPhone}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {departmentInfo.hodEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Department Office</h3>
                  <p className="text-gray-600">{departmentInfo.location}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {departmentInfo.officePhone}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {departmentInfo.officeEmail}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {departmentInfo.workingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Contact Methods</h3>
              <div className="space-y-3">
                {quickContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{contact.title}</h4>
                      <p className="text-sm text-gray-600">{contact.description}</p>
                      <p className="text-xs text-gray-500">{contact.available}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(contact.phone, `phone-${index}`)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {copiedText === `phone-${index}` ? <CheckCircle className="h-5 w-5" /> : contact.phone}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Developer Contacts */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Our Development Team
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Meet our technical team who are here to help you with various issues and support.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developers.map((dev) => (
              <div key={dev.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 group hover:shadow-2xl transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={dev.avatar}
                      alt={dev.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{dev.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{dev.role}</p>
                  <p className="text-sm text-gray-600 mb-4">{dev.specialization}</p>
                  
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      {dev.responseTime}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      {dev.availability}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-3 text-green-600" />
                    <span className="flex-1">{dev.phone}</span>
                    <button
                      onClick={() => copyToClipboard(dev.phone, `dev-phone-${dev.id}`)}
                      className="text-green-600 hover:text-green-800"
                    >
                      {copiedText === `dev-phone-${dev.id}` ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-3 text-purple-600" />
                    <span className="flex-1">{dev.email}</span>
                    <button
                      onClick={() => copyToClipboard(dev.email, `dev-email-${dev.id}`)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      {copiedText === `dev-email-${dev.id}` ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Expertise:</h4>
                  <div className="flex flex-wrap gap-2">
                    {dev.expertise.map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => openWhatsApp(dev.whatsapp, `Hi ${dev.name}, I need help with ${dev.specialization.toLowerCase()}`)}
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => window.open(`mailto:${dev.email}`, '_blank')}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Groups */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Join Our WhatsApp Groups
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Connect with our community through WhatsApp groups for updates, discussions, and support.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatsappGroups.map((group, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 group hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{group.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {group.type}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {group.members} members
                      </span>
                      <button
                        onClick={() => window.open(group.link, '_blank')}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center text-sm"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Join Group
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Send us a Message
          </h2>
          
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Issue</option>
                  <option value="academic">Academic Query</option>
                  <option value="admission">Admission Related</option>
                  <option value="notes">Notes & Resources</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter message subject"
              />
            </div>
            
            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your message here..."
              />
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-semibold text-lg flex items-center mx-auto"
              >
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Map Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Find Us on Map
          </h2>
          
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center relative overflow-hidden">
            {/* Google Maps Embed */}
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.123456789!2d83.8080!3d19.0790!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGandhi%20Institute%20of%20Engineering%20and%20Technology%20University!5e0!3m2!1sen!2sin!4v1640995200000!5m2!1sen!2sin`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            />
            
            {/* Map Overlay Info */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-2">GIETU Campus</h3>
              <p className="text-sm text-gray-600 mb-2">{collegeInfo.fullAddress}</p>
              <button
                onClick={openMap}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                <Navigation className="h-4 w-4 mr-1" />
                Open in Google Maps
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">
              <strong>Directions:</strong> The campus is located in Gunupur, Rayagada District, Odisha. 
              It's easily accessible by road and is well-connected to major cities in Odisha.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>📍 PIN: 765022</span>
              <span>🏛️ Private University</span>
              <span>⭐ NAAC Accredited</span>
              <span>🎓 Est. 1997</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
