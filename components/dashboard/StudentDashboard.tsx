'use client'

import { useState } from 'react'
import { 
  BookOpen, 
  BarChart3, 
  FileText, 
  Calendar, 
  Bell, 
  Download, 
  Eye,
  Clock,
  Award,
  TrendingUp,
  User,
  GraduationCap,
  Edit3,
  Save,
  X,
  Linkedin,
  Github,
  ExternalLink
} from 'lucide-react'

interface User {
  name?: string | null
  email?: string | null
  role?: string | null
  studentId?: string | null
  department?: string | null
  semester?: string | null
  linkedin?: string | null
  github?: string | null
}

interface StudentDashboardProps {
  user: User
}

export default function StudentDashboard({ user }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: user.name || '',
    semester: user.semester || '3',
    linkedin: user.linkedin || 'https://linkedin.com/in/student-profile',
    github: user.github || 'https://github.com/student-username'
  })
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - in real app, this would come from API
  const studentData = {
    name: user.name || 'Student',
    studentId: user.studentId || 'CSE2024001',
    department: user.department || 'CSE',
    semester: user.semester || '3',
    linkedin: user.linkedin || 'https://linkedin.com/in/your-profile',
    github: user.github || 'https://github.com/your-username',
    notices: [
      { title: 'Exam Schedule Released', date: '2024-03-10', priority: 'high' },
      { title: 'Library Hours Extended', date: '2024-03-08', priority: 'medium' },
      { title: 'Hackathon Registration Open', date: '2024-03-05', priority: 'low' }
    ]
  }

  const handleEditClick = () => {
    setEditForm({
      name: user.name || '',
      semester: user.semester || '3',
      linkedin: user.linkedin || 'https://linkedin.com/in/student-profile',
      github: user.github || 'https://github.com/student-username'
    })
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditForm({
      name: user.name || '',
      semester: user.semester || '3',
      linkedin: studentData.linkedin || '',
      github: studentData.github || ''
    })
  }

  const handleSaveEdit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm)
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      const data = await response.json()
      console.log('Profile updated successfully:', data)
      
      setIsEditing(false)
      
      // Refresh the page to show updated data
      window.location.reload()
      
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    })
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'results', name: 'Results', icon: Award },
    { id: 'attendance', name: 'Attendance', icon: Clock },
    { id: 'question-papers', name: 'Question Papers', icon: FileText },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'notices', name: 'Notices', icon: Bell }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Student Information */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">
              {(isEditing ? editForm.name : studentData.name).split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          
          {/* Edit Button */}
          <div className="flex justify-center mb-4">
            {!isEditing ? (
              <button
                onClick={handleEditClick}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {!isEditing ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{studentData.name}</h2>
              <p className="text-gray-600 mb-4">Student ID: {studentData.studentId}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-1">Department</h3>
                  <p className="text-lg font-semibold text-blue-600">{studentData.department}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-1">Current Semester</h3>
                  <p className="text-lg font-semibold text-green-600">{studentData.semester}</p>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex justify-center gap-4">
                <a
                  href={studentData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href={studentData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </>
          ) : (
            <>
              {/* Edit Form */}
              <div className="max-w-md mx-auto space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Semester
                  </label>
                  <select
                    id="semester"
                    name="semester"
                    value={editForm.semester}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="1">1st Semester</option>
                    <option value="2">2nd Semester</option>
                    <option value="3">3rd Semester</option>
                    <option value="4">4th Semester</option>
                    <option value="5">5th Semester</option>
                    <option value="6">6th Semester</option>
                    <option value="7">7th Semester</option>
                    <option value="8">8th Semester</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={editForm.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                </div>

                <div>
                  <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    value={editForm.github}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/your-username"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-1">Department</h3>
                  <p className="text-lg font-semibold text-blue-600">{studentData.department}</p>
                  <p className="text-xs text-gray-500 mt-1">Department cannot be changed</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )

  const renderResults = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Results</h3>
        <div className="text-center py-12">
          <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Coming Soon</p>
          <p className="text-sm text-gray-400 mt-2">Academic results will appear here once published by faculty</p>
        </div>
      </div>
    </div>
  )

  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h3>
        <div className="text-gray-600 text-center py-12">
          <Clock className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-lg font-medium mb-2">Coming Soon</p>
          <p>Attendance data will be available once courses begin.</p>
        </div>
      </div>
    </div>
  )

  const renderQuestionPapers = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Papers Archive</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Data Structures', 'Computer Networks', 'Database Systems', 'Operating Systems', 'Software Engineering', 'Algorithms'].map((subject, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{subject}</h4>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">CSE</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Previous year question papers</p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                  <Download className="h-4 w-4 inline mr-1" />
                  Download
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-50 transition-colors">
                  <Eye className="h-4 w-4 inline mr-1" />
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Events</h3>
        <div className="space-y-4">
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No upcoming events</p>
            <p className="text-sm text-gray-400 mt-2">Department events will be listed here when available</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotices = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Notices</h3>
        <div className="space-y-4">
          {studentData.notices.map((notice, index) => (
            <div key={index} className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{notice.title}</h4>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  notice.priority === 'high' ? 'bg-red-100 text-red-800' :
                  notice.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {notice.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600">{new Date(notice.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'results':
        return renderResults()
      case 'attendance':
        return renderAttendance()
      case 'question-papers':
        return renderQuestionPapers()
      case 'events':
        return renderEvents()
      case 'notices':
        return renderNotices()
      default:
        return renderOverview()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Welcome back, {studentData.name}!</h1>
            <p className="text-sm sm:text-base text-gray-600">
              {studentData.department} • Semester {studentData.semester} • {studentData.studentId}
            </p>
          </div>
          <div className="flex items-center justify-center sm:justify-end">
            <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg">
        <nav className="flex flex-wrap gap-1 sm:space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">{tab.name}</span>
              <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  )
}
