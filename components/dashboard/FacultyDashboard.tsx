'use client'

import { useState } from 'react'
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Upload, 
  Bell, 
  Calendar, 
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Search,
  Filter,
  GraduationCap,
  Clock,
  Award,
  TrendingUp
} from 'lucide-react'

interface User {
  name?: string | null
  email?: string | null
  role?: string | null
  department?: string | null
  designation?: string | null
}

interface FacultyDashboardProps {
  user: User
}

export default function FacultyDashboard({ user }: FacultyDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data - in real app, this would come from API
  const facultyData = {
    name: user.name || 'Faculty Member',
    department: user.department || 'CSE',
    designation: user.designation || 'Professor',
    subjects: [
      { id: 1, name: 'Data Structures', code: 'CSE201', semester: '3', students: 45, credits: 4 },
      { id: 2, name: 'Computer Networks', code: 'CSE202', semester: '4', students: 42, credits: 3 },
      { id: 3, name: 'Database Systems', code: 'CSE203', semester: '5', students: 38, credits: 4 },
      { id: 4, name: 'Software Engineering', code: 'CSE204', semester: '6', students: 40, credits: 3 }
    ],
    students: [
      { id: 1, name: 'John Doe', studentId: 'CSE2024001', semester: '3', attendance: 85, cgpa: 8.5 },
      { id: 2, name: 'Jane Smith', studentId: 'CSE2024002', semester: '3', attendance: 92, cgpa: 9.2 },
      { id: 3, name: 'Mike Johnson', studentId: 'CSE2024003', semester: '4', attendance: 78, cgpa: 7.8 },
      { id: 4, name: 'Sarah Wilson', studentId: 'CSE2024004', semester: '4', attendance: 88, cgpa: 8.8 },
      { id: 5, name: 'David Brown', studentId: 'CSE2024005', semester: '5', attendance: 90, cgpa: 9.0 }
    ],
    recentResults: [
      { subject: 'Data Structures', student: 'John Doe', marks: 85, maxMarks: 100, grade: 'A' },
      { subject: 'Computer Networks', student: 'Jane Smith', marks: 78, maxMarks: 100, grade: 'B+' },
      { subject: 'Database Systems', student: 'Mike Johnson', marks: 82, maxMarks: 100, grade: 'A-' }
    ],
    notices: [
      { id: 1, title: 'Mid-term Exam Schedule', content: 'Mid-term exams will be conducted from March 15-20', priority: 'high', date: '2024-03-10' },
      { id: 2, title: 'Project Submission Deadline', content: 'Final year projects must be submitted by March 25', priority: 'medium', date: '2024-03-08' },
      { id: 3, title: 'Library Hours Extended', content: 'Library will remain open till 10 PM during exam period', priority: 'low', date: '2024-03-05' }
    ],
    upcomingEvents: [
      { title: 'Faculty Meeting', date: '2024-03-15', time: '10:00 AM', type: 'Meeting' },
      { title: 'Student Presentation', date: '2024-03-18', time: '2:00 PM', type: 'Presentation' },
      { title: 'Department Seminar', date: '2024-03-22', time: '11:00 AM', type: 'Seminar' }
    ]
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'students', name: 'Students', icon: Users },
    { id: 'subjects', name: 'Subjects', icon: BookOpen },
    { id: 'results', name: 'Results', icon: Award },
    { id: 'attendance', name: 'Attendance', icon: Clock },
    { id: 'notices', name: 'Notices', icon: Bell },
    { id: 'events', name: 'Events', icon: Calendar }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{facultyData.students.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Subjects</p>
              <p className="text-2xl font-bold text-gray-900">{facultyData.subjects.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Results Uploaded</p>
              <p className="text-2xl font-bold text-gray-900">{facultyData.recentResults.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
              <p className="text-2xl font-bold text-gray-900">85%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Results</h3>
          <div className="space-y-3">
            {facultyData.recentResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{result.student}</p>
                  <p className="text-sm text-gray-600">{result.subject}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{result.marks}/{result.maxMarks}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {result.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {facultyData.upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderStudents = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CGPA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {facultyData.students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.semester}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      student.attendance >= 85 ? 'bg-green-100 text-green-800' :
                      student.attendance >= 75 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.cgpa}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderSubjects = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">My Subjects</h3>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Subject
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facultyData.subjects.map((subject) => (
            <div key={subject.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">{subject.name}</h4>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {subject.code}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Semester: {subject.semester}</p>
                <p>Students: {subject.students}</p>
                <p>Credits: {subject.credits}</p>
              </div>
              <div className="flex space-x-2 mt-4">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                  <Eye className="h-4 w-4 inline mr-1" />
                  View
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-50 transition-colors">
                  <Edit className="h-4 w-4 inline mr-1" />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderResults = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Result Management</h3>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Upload className="h-4 w-4 mr-2" />
            Upload Results
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {facultyData.recentResults.map((result, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {result.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.student}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.marks}/{result.maxMarks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {result.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
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
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Attendance Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Mark Attendance</h4>
            <div className="space-y-3">
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Select Subject</option>
                {facultyData.subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Mark Attendance
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Attendance Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Classes</span>
                <span className="text-sm font-medium">30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Present</span>
                <span className="text-sm font-medium text-green-600">25</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Absent</span>
                <span className="text-sm font-medium text-red-600">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Percentage</span>
                <span className="text-sm font-medium text-blue-600">83.3%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotices = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Notice Management</h3>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Create Notice
          </button>
        </div>
        
        <div className="space-y-4">
          {facultyData.notices.map((notice) => (
            <div key={notice.id} className="border border-gray-200 rounded-lg p-4">
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
              <p className="text-sm text-gray-600 mb-2">{notice.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{new Date(notice.date).toLocaleDateString()}</span>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
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
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Event Management</h3>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </button>
        </div>
        
        <div className="space-y-4">
          {facultyData.upcomingEvents.map((event, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {event.type}
                  </span>
                  <button className="text-blue-600 hover:text-blue-900">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
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
      case 'students':
        return renderStudents()
      case 'subjects':
        return renderSubjects()
      case 'results':
        return renderResults()
      case 'attendance':
        return renderAttendance()
      case 'notices':
        return renderNotices()
      case 'events':
        return renderEvents()
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
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {facultyData.name}!</h1>
            <p className="text-gray-600">
              {facultyData.department} • {facultyData.designation}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 p-3 rounded-lg">
              <GraduationCap className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg">
        <nav className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
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
