'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Calendar, 
  BookOpen, 
  Clock, 
  Users, 
  ChevronDown,
  ChevronRight,
  Eye,
  Star,
  Award,
  GraduationCap,
  Code,
  Database,
  Shield,
  Globe,
  Zap,
  Target,
  CheckCircle,
  AlertCircle,
  Info,
  ExternalLink,
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  Share2
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function QuestionPapersPage() {
  const [selectedSemester, setSelectedSemester] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('question-papers')
  const [expandedSemester, setExpandedSemester] = useState<number | null>(null)
  const [questionPapers, setQuestionPapers] = useState<any[]>([])
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [notesLoading, setNotesLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notesError, setNotesError] = useState<string | null>(null)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  // BTech Semesters
  const semesters = [
    { id: 1, name: '1st Semester', subjects: ['Mathematics-I', 'Physics', 'Chemistry', 'English', 'Engineering Graphics'] },
    { id: 2, name: '2nd Semester', subjects: ['Mathematics-II', 'Programming in C', 'Digital Electronics', 'Mechanics', 'Environmental Science'] },
    { id: 3, name: '3rd Semester', subjects: ['Data Structures', 'Computer Organization', 'Discrete Mathematics', 'Software Engineering', 'Communication Skills'] },
    { id: 4, name: '4th Semester', subjects: ['Algorithm Design', 'Database Management', 'Operating Systems', 'Computer Networks', 'Object-Oriented Programming'] },
    { id: 5, name: '5th Semester', subjects: ['Web Technologies', 'Machine Learning', 'Software Testing', 'Computer Graphics', 'Microprocessors'] },
    { id: 6, name: '6th Semester', subjects: ['Artificial Intelligence', 'Data Mining', 'Mobile Computing', 'Information Security', 'Project Management'] },
    { id: 7, name: '7th Semester', subjects: ['Cloud Computing', 'Big Data Analytics', 'Cyber Security', 'IoT', 'Advanced Algorithms'] },
    { id: 8, name: '8th Semester', subjects: ['Final Year Project', 'Industrial Training', 'Research Methodology', 'Ethics in Computing', 'Entrepreneurship'] }
  ]

  // Fetch question papers from API
  const fetchQuestionPapers = async () => {
    setLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams()
      if (selectedSemester !== 'all') queryParams.append('semester', selectedSemester)
      if (selectedSubject !== 'all') queryParams.append('subject', selectedSubject)
      if (selectedYear !== 'all') queryParams.append('year', selectedYear)
      if (searchTerm) queryParams.append('search', searchTerm)

      const response = await fetch(`/api/question-papers?${queryParams.toString()}`)
      if (!response.ok) {
        throw new Error('Failed to fetch question papers')
      }
      
      const data = await response.json()
      setQuestionPapers(data.papers || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load question papers')
      console.error('Error fetching question papers:', err)
    } finally {
      setLoading(false)
    }
  }

  // Load question papers on component mount and when filters change
  useEffect(() => {
    if (activeTab === 'question-papers') {
      fetchQuestionPapers()
    } else if (activeTab === 'notes') {
      fetchNotes()
    }
  }, [activeTab, selectedSemester, selectedSubject, selectedYear, searchTerm])

  // Handle download and update download count
  const handleDownload = async (paper: any) => {
    try {
      // Validate file URL exists
      if (!paper.fileUrl) {
        alert('File URL not available for this question paper')
        return
      }

      // Set downloading state
      setDownloadingId(paper.id)

      console.log(`Downloading: ${paper.title}`)
      console.log(`File URL: ${paper.fileUrl}`)

      // Track download count first
      const response = await fetch('/api/question-papers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: paper.id }),
      })

      if (response.ok) {
        console.log('Download count updated successfully')
      }

      // Redirect to the file URL from database
      // This will either download the file or open it in a new tab depending on the file type
      window.open(paper.fileUrl, '_blank')
      
      console.log(`Successfully initiated download for: ${paper.title}`)

      // Refresh the list to update download count
      setTimeout(() => {
        fetchQuestionPapers()
        setDownloadingId(null) // Clear downloading state
      }, 1000) // Small delay to allow the download count update to process

    } catch (error) {
      console.error('Error downloading file:', error)
      alert('Error downloading file. Please try again.')
      setDownloadingId(null) // Clear downloading state on error
    }
  }

  // Handle notes download
  const handleNotesDownload = async (note: any) => {
    try {
      // Validate file URL exists
      if (!note.fileUrl) {
        alert('File URL not available for these notes')
        return
      }

      console.log(`Downloading: ${note.title}`)
      console.log(`File URL: ${note.fileUrl}`)

      // Redirect to the file URL from database
      window.open(note.fileUrl, '_blank')
      
      console.log(`Successfully initiated download for: ${note.title}`)

    } catch (error) {
      console.error('Error downloading notes:', error)
      alert('Error downloading notes. Please try again.')
    }
  }

  // Fetch notes from API
  const fetchNotes = async () => {
    setNotesLoading(true)
    setNotesError(null)
    try {
      const queryParams = new URLSearchParams()
      if (selectedSemester !== 'all') queryParams.append('semester', selectedSemester)
      if (selectedSubject !== 'all') queryParams.append('subject', selectedSubject)
      if (selectedYear !== 'all') queryParams.append('year', selectedYear)
      if (searchTerm) queryParams.append('search', searchTerm)

      const response = await fetch(`/api/notes?${queryParams.toString()}`)
      if (!response.ok) {
        throw new Error('Failed to fetch notes')
      }
      
      const data = await response.json()
      setNotes(data.notes || [])
    } catch (err) {
      setNotesError(err instanceof Error ? err.message : 'Failed to load notes')
      console.error('Error fetching notes:', err)
    } finally {
      setNotesLoading(false)
    }
  }

  // Academic Calendar
  const academicCalendar = [
    {
      semester: 1,
      events: [
        { date: '2024-08-01', event: 'Semester Begins', type: 'Academic' },
        { date: '2024-09-15', event: 'Mid Term Exams', type: 'Exam' },
        { date: '2024-10-01', event: 'Mid Term Break', type: 'Holiday' },
        { date: '2024-11-15', event: 'Final Exams', type: 'Exam' },
        { date: '2024-12-15', event: 'Semester Ends', type: 'Academic' }
      ]
    },
    {
      semester: 2,
      events: [
        { date: '2024-12-16', event: 'Semester Begins', type: 'Academic' },
        { date: '2025-01-15', event: 'Mid Term Exams', type: 'Exam' },
        { date: '2025-02-01', event: 'Mid Term Break', type: 'Holiday' },
        { date: '2025-03-15', event: 'Final Exams', type: 'Exam' },
        { date: '2025-04-15', event: 'Semester Ends', type: 'Academic' }
      ]
    }
  ]

  // Since filtering is now done server-side via API, we can use papers directly
  const filteredPapers = questionPapers

  // Since filtering is now done server-side via API for notes too, we can use notes directly
  const filteredNotes = notes

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Final Exam': return 'from-red-500 to-pink-500'
      case 'Mid Term': return 'from-blue-500 to-cyan-500'
      case 'Quiz': return 'from-green-500 to-emerald-500'
      case 'Assignment': return 'from-purple-500 to-violet-500'
      case 'Lab Exam': return 'from-orange-500 to-amber-500'
      case 'Viva': return 'from-indigo-500 to-blue-500'
      default: return 'from-gray-500 to-slate-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Question Papers & Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Access question papers, exam papers, academic calendar, and semester-wise notes 
            for BTech Computer Science students. Everything you need for academic success!
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/20">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'question-papers', name: 'Question Papers', icon: FileText },
                { id: 'notes', name: 'Notes', icon: BookOpen },
                { id: 'academic-calendar', name: 'Academic Calendar', icon: Calendar },
                { id: 'semester-guide', name: 'Semester Guide', icon: GraduationCap }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        {(activeTab === 'question-papers' || activeTab === 'notes') && (
          <div className="mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Semester Filter */}
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Semesters</option>
                  {semesters.map((sem) => (
                    <option key={sem.id} value={sem.id}>{sem.name}</option>
                  ))}
                </select>

                {/* Subject Filter */}
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Subjects</option>
                  {Array.from(new Set(questionPapers.map(item => item.subject))).map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>

                {/* Year Filter */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Years</option>
                  {Array.from(new Set(questionPapers.map(item => item.year))).sort().reverse().map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Question Papers Tab */}
        {activeTab === 'question-papers' && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Question Papers & Exam Papers
            </h2>
            
            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading question papers...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Question Papers</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={fetchQuestionPapers}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredPapers.length === 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Question Papers Found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm || selectedSemester !== 'all' || selectedSubject !== 'all' || selectedYear !== 'all'
                    ? 'Try adjusting your filters to find more question papers.'
                    : 'No question papers are available in the database yet.'}
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedSemester('all')
                    setSelectedSubject('all')
                    setSelectedYear('all')
                  }}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Question Papers Grid */}
            {!loading && !error && filteredPapers.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPapers.map((paper) => (
                <div key={paper.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getTypeColor(paper.type)} text-white`}>
                        {paper.type}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(paper.difficulty)}`}>
                        {paper.difficulty}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {paper.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">{paper.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <BookOpen className="h-4 w-4 mr-2" />
                        {paper.subject}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        {semesters.find(s => s.id === paper.semester)?.name}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        {paper.duration} • {paper.marks} marks
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Download className="h-4 w-4 mr-2" />
                        {paper.downloads} downloads • {paper.fileSize}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < Math.floor(paper.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{paper.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">{paper.uploadedDate}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleDownload(paper)}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center group"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </button>
                      <button className="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors duration-200">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            )}
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Semester-wise Notes
            </h2>
            
            {/* Loading State */}
            {notesLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                <span className="ml-3 text-gray-600">Loading notes...</span>
              </div>
            )}

            {/* Error State */}
            {notesError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center mb-8">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Notes</h3>
                <p className="text-red-600 mb-4">{notesError}</p>
                <button 
                  onClick={fetchNotes}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty State */}
            {!notesLoading && !notesError && filteredNotes.length === 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center mb-8">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Notes Found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm || selectedSemester !== 'all' || selectedSubject !== 'all' || selectedYear !== 'all'
                    ? 'Try adjusting your filters to find more notes.'
                    : 'No notes are available in the database yet.'}
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedSemester('all')
                    setSelectedSubject('all')
                    setSelectedYear('all')
                  }}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Notes Grid */}
            {!notesLoading && !notesError && filteredNotes.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <div key={note.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        {note.type}
                      </div>
                      <div className="text-sm text-gray-500">{note.fileSize}</div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {note.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">{note.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <BookOpen className="h-4 w-4 mr-2" />
                        {note.subject}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        {semesters.find(s => s.id === note.semester)?.name}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Download className="h-4 w-4 mr-2" />
                        {note.downloads} downloads
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Chapters Covered:</h4>
                      <div className="flex flex-wrap gap-1">
                        {note.chapters.map((chapter: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {chapter}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < Math.floor(note.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{note.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">{note.uploadedDate}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleNotesDownload(note)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center group"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </button>
                      <button className="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors duration-200">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            )}
          </div>
        )}

        {/* Academic Calendar Tab */}
        {activeTab === 'academic-calendar' && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Academic Calendar
            </h2>
            <div className="space-y-8">
              {academicCalendar.map((semester) => (
                <div key={semester.semester} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    {semesters.find(s => s.id === semester.semester)?.name} Academic Calendar
                  </h3>
                  <div className="space-y-4">
                    {semester.events.map((event, index) => (
                      <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                        <div className={`w-4 h-4 rounded-full mr-4 ${
                          event.type === 'Exam' ? 'bg-red-500' :
                          event.type === 'Holiday' ? 'bg-green-500' :
                          'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{event.event}</h4>
                          <p className="text-sm text-gray-600">{event.type}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Semester Guide Tab */}
        {activeTab === 'semester-guide' && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              BTech Semester Guide
            </h2>
            <div className="space-y-6">
              {semesters.map((semester) => (
                <div key={semester.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                  <button
                    onClick={() => setExpandedSemester(expandedSemester === semester.id ? null : semester.id)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{semester.name}</h3>
                        <p className="text-gray-600">{semester.subjects.length} subjects</p>
                      </div>
                      {expandedSemester === semester.id ? (
                        <ChevronDown className="h-6 w-6 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-6 w-6 text-gray-500" />
                      )}
                    </div>
                  </button>
                  
                  {expandedSemester === semester.id && (
                    <div className="px-6 pb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {semester.subjects.map((subject, index) => (
                          <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                            <h4 className="font-semibold text-gray-900 mb-2">{subject}</h4>
                            <div className="flex items-center text-sm text-gray-600">
                              <BookOpen className="h-4 w-4 mr-2" />
                              Available Resources
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need More Resources?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Can't find what you're looking for? Request specific question papers, 
            notes, or academic materials from our faculty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center">
              <Plus className="h-5 w-5 mr-2" />
              Request Resource
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors duration-200 flex items-center justify-center">
              <Share2 className="h-5 w-5 mr-2" />
              Share Feedback
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
