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
  GraduationCap
} from 'lucide-react'

interface User {
  name?: string | null
  email?: string | null
  role?: string | null
  studentId?: string | null
  department?: string | null
  semester?: string | null
}

interface StudentDashboardProps {
  user: User
}

export default function StudentDashboard({ user }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data - in real app, this would come from API
  const studentData = {
    name: user.name || 'Student',
    studentId: user.studentId || 'CSE2024001',
    department: user.department || 'CSE',
    semester: user.semester || '3',
    cgpa: 8.5,
    attendance: 85,
    subjects: [
      { name: 'Data Structures', code: 'CSE201', credits: 4, grade: 'A' },
      { name: 'Computer Networks', code: 'CSE202', credits: 3, grade: 'B+' },
      { name: 'Database Systems', code: 'CSE203', credits: 4, grade: 'A-' },
      { name: 'Operating Systems', code: 'CSE204', credits: 3, grade: 'B' },
      { name: 'Software Engineering', code: 'CSE205', credits: 3, grade: 'A' }
    ],
    recentResults: [
      { subject: 'Data Structures', marks: 85, maxMarks: 100, grade: 'A' },
      { subject: 'Computer Networks', marks: 78, maxMarks: 100, grade: 'B+' },
      { subject: 'Database Systems', marks: 82, maxMarks: 100, grade: 'A-' }
    ],
    upcomingEvents: [
      { title: 'Mid-term Exams', date: '2024-03-15', type: 'Exam' },
      { title: 'Tech Symposium', date: '2024-03-20', type: 'Event' },
      { title: 'Project Submission', date: '2024-03-25', type: 'Deadline' }
    ],
    notices: [
      { title: 'Exam Schedule Released', date: '2024-03-10', priority: 'high' },
      { title: 'Library Hours Extended', date: '2024-03-08', priority: 'medium' },
      { title: 'Hackathon Registration Open', date: '2024-03-05', priority: 'low' }
    ]
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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">CGPA</p>
              <p className="text-2xl font-bold text-gray-900">{studentData.cgpa}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{studentData.attendance}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Subjects</p>
              <p className="text-2xl font-bold text-gray-900">{studentData.subjects.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rank</p>
              <p className="text-2xl font-bold text-gray-900">15/120</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Results */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Results</h3>
        <div className="space-y-3">
          {studentData.recentResults.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{result.subject}</p>
                <p className="text-sm text-gray-600">{result.marks}/{result.maxMarks} marks</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {result.grade}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {studentData.upcomingEvents.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{event.title}</p>
                <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {event.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderResults = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Results</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studentData.subjects.map((subject, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subject.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subject.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subject.credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {subject.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h3>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Attendance</span>
            <span className="text-sm font-medium text-gray-700">{studentData.attendance}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${studentData.attendance}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">Present</p>
                <p className="text-lg font-bold text-green-900">85 days</p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">Absent</p>
                <p className="text-lg font-bold text-red-900">15 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderQuestionPapers = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Papers Archive</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          {studentData.upcomingEvents.map((event, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {event.type}
                </span>
              </div>
            </div>
          ))}
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
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {studentData.name}!</h1>
            <p className="text-gray-600">
              {studentData.department} • Semester {studentData.semester} • {studentData.studentId}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-blue-100 p-3 rounded-lg">
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg">
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  )
}
