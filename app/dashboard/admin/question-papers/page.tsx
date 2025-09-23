'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useQuestionPapers } from '@/hooks/useQuestionPapers'
import { StatsSkeleton, TableSkeleton } from '@/components/ui/Skeleton'
import AdminLayout from '@/components/layout/AdminLayout'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  FileText, 
  Download, 
  Search,
  Filter,
  Upload,
  RefreshCw,
  Eye,
  Calendar,
  Book,
  GraduationCap
} from 'lucide-react'

interface QuestionPaper {
  id: string
  title: string
  subject: string
  semester: number
  year: string
  type: string
  duration: string
  marks: string
  difficulty: string
  fileSize: string
  fileUrl: string
  fileName?: string
  downloads: number
  rating: number
  uploadedDate: string
  uploadedBy: string
  description: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

interface QuestionPaperStats {
  total: number
  byType: Record<string, number>
  bySemester: Record<string, number>
  totalDownloads: number
}

export default function AdminQuestionPapersPage() {
  const {
    questionPapers,
    stats,
    loading,
    error,
    lastUpdated,
    refreshQuestionPapers,
    createQuestionPaper,
    updateQuestionPaper,
    deleteQuestionPaper
  } = useQuestionPapers(true) // Disable auto-refresh for admin interface
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [semesterFilter, setSemesterFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingPaper, setEditingPaper] = useState<QuestionPaper | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Debounce search term for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300) // 300ms delay

    return () => clearTimeout(timer)
  }, [searchTerm])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshQuestionPapers()
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const handleDelete = async (paperId: string) => {
    if (!confirm('Are you sure you want to delete this question paper?')) return

    const result = await deleteQuestionPaper(paperId)
    if (!result.success) {
      alert(result.error || 'Failed to delete question paper')
    }
  }

  const filteredPapers = useMemo(() => {
    return questionPapers.filter(paper => {
      const matchesSearch = debouncedSearchTerm === '' || 
        paper.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        paper.subject.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        paper.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      
      const matchesType = typeFilter === 'all' || paper.type === typeFilter
      const matchesSemester = semesterFilter === 'all' || paper.semester.toString() === semesterFilter
      const matchesYear = yearFilter === 'all' || paper.year === yearFilter
      
      return matchesSearch && matchesType && matchesSemester && matchesYear
    })
  }, [questionPapers, debouncedSearchTerm, typeFilter, semesterFilter, yearFilter])

  if (loading && questionPapers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Question Papers Management</h1>
            <p className="text-gray-600">Loading question papers...</p>
          </div>
          <StatsSkeleton />
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4">
                <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-48 h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <TableSkeleton rows={8} cols={7} />
        </div>
      </div>
    )
  }

  return (
    <AdminLayout currentPage="/dashboard/admin/question-papers">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Question Papers Management</h1>
              <p className="text-gray-600">Manage question papers, exams, and academic resources</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-2">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <span className="text-gray-600">Total Papers</span>
                  <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                </div>
                <div className="text-center">
                  <span className="text-gray-600">Total Downloads</span>
                  <div className="text-2xl font-bold text-green-600">{stats.totalDownloads}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Mid Semester</div>
                <div className="text-2xl font-bold text-gray-900">{stats.byType.mid || 0}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Book className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Semester End</div>
                <div className="text-2xl font-bold text-gray-900">{stats.byType.sem || 0}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <GraduationCap className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Final Exams</div>
                <div className="text-2xl font-bold text-gray-900">{stats.byType.final || 0}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Download className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Avg Downloads</div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.total > 0 ? Math.round(stats.totalDownloads / stats.total) : 0}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search question papers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="mid">Mid Semester</option>
                  <option value="sem">Semester End</option>
                  <option value="final">Final Exam</option>
                  <option value="quiz">Quiz</option>
                </select>

                <select
                  value={semesterFilter}
                  onChange={(e) => setSemesterFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Semesters</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                  <option value="7">Semester 7</option>
                  <option value="8">Semester 8</option>
                </select>

                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Years</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Question Paper
              </button>
            </div>
          </div>
        </div>

        {/* Question Papers List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {filteredPapers.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-4">
                <FileText className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Question Papers Found</h3>
              <p className="text-gray-600">
                {searchTerm || typeFilter !== 'all' || semesterFilter !== 'all' || yearFilter !== 'all'
                  ? 'Try adjusting your search criteria.'
                  : 'Get started by adding your first question paper.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Question Paper
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Semester & Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Downloads
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File Size
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPapers.map((paper) => (
                    <tr key={paper.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                              {paper.subject}
                            </div>
                            <div className="text-sm text-gray-500">
                              {paper.uploadedBy}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Semester {paper.semester}
                        </div>
                        <div className="text-sm text-gray-500">{paper.year}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          paper.type === 'mid' ? 'bg-blue-100 text-blue-800' :
                          paper.type === 'sem' ? 'bg-green-100 text-green-800' :
                          paper.type === 'final' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {paper.type === 'mid' ? 'Mid Semester' :
                           paper.type === 'sem' ? 'Semester End' :
                           paper.type === 'final' ? 'Final Exam' :
                           paper.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Download className="h-4 w-4 text-gray-400 mr-1" />
                          {paper.downloads}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {paper.fileSize}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => window.open(paper.fileUrl, '_blank')}
                            className="text-green-600 hover:text-green-900 p-1 rounded"
                            title="Preview File"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setEditingPaper(paper)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            title="Edit Question Paper"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(paper.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            title="Delete Question Paper"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Page <span className="font-medium">{currentPage}</span> of{' '}
                    <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage <= 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Question Paper Modal */}
      {(showAddModal || editingPaper) && (
        <QuestionPaperModal
          paper={editingPaper}
          onClose={() => {
            setShowAddModal(false)
            setEditingPaper(null)
          }}
          onSave={() => {
            setShowAddModal(false)
            setEditingPaper(null)
          }}
          createQuestionPaper={createQuestionPaper}
          updateQuestionPaper={updateQuestionPaper}
        />
      )}
      </div>
    </AdminLayout>
  )
}

// Question Paper Modal Component
function QuestionPaperModal({ 
  paper, 
  onClose, 
  onSave,
  createQuestionPaper,
  updateQuestionPaper
}: { 
  paper: QuestionPaper | null
  onClose: () => void
  onSave: () => void
  createQuestionPaper: (data: any) => Promise<{ success: boolean; paper?: any; error?: any }>
  updateQuestionPaper: (id: string, data: any) => Promise<{ success: boolean; paper?: any; error?: any }>
}) {
  const [formData, setFormData] = useState({
    subject: paper?.subject || '',
    semester: paper?.semester || 1,
    year: paper?.year || new Date().getFullYear().toString(),
    type: paper?.type || 'mid',
    description: paper?.description || '',
    fileName: paper?.fileName || '',
    fileUrl: paper?.fileUrl || '',
    uploadedBy: paper?.uploadedBy || ''
  })
  const [loading, setLoading] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Only PDF, JPEG, and PNG are allowed.')
        return
      }

      // Validate file size (10MB max)
      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        alert('File size too large. Maximum 10MB allowed.')
        return
      }

      setSelectedFile(file)
      setFormData({
        ...formData,
        fileName: file.name
      })
    }
  }

  const normalizeFileUrl = (url: string): string => {
    if (!url) return ''
    
    // If it's already a full URL, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    
    // If it starts with /uploads/, it's already correct
    if (url.startsWith('/uploads/')) {
      return url
    }
    
    // If it's a local file path, convert to uploads path
    if (url.includes('\\') || url.includes('C:') || url.includes('c:')) {
      const fileName = url.split(/[\\\/]/).pop() || 'document.pdf'
      return `/uploads/question-papers/${fileName}`
    }
    
    // If it's just a filename, add uploads path
    if (!url.includes('/')) {
      return `/uploads/question-papers/${url}`
    }
    
    // Default case - return as is with leading slash if needed
    return url.startsWith('/') ? url : `/${url}`
  }

  const handleFileUpload = async (file: File) => {
    setUploadingFile(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('type', 'question-paper')

      const response = await fetch('/api/upload/file', {
        method: 'POST',
        body: uploadFormData,
      })

      const data = await response.json()

      if (response.ok) {
        return normalizeFileUrl(data.fileUrl || data.url)
      } else {
        throw new Error(data.message || 'Failed to upload file')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Failed to upload file')
      return null
    } finally {
      setUploadingFile(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let finalFormData = { ...formData }

      // Upload file if a new one is selected
      if (selectedFile) {
        const uploadedFileUrl = await handleFileUpload(selectedFile)
        if (uploadedFileUrl) {
          finalFormData.fileUrl = uploadedFileUrl
        } else {
          setLoading(false)
          return
        }
      } else {
        // Normalize manually entered file URL
        finalFormData.fileUrl = normalizeFileUrl(finalFormData.fileUrl)
      }

      if (paper) {
        // Update existing question paper
        const result = await updateQuestionPaper(paper.id, {
          subjectName: finalFormData.subject,
          examType: finalFormData.type,
          semester: finalFormData.semester,
          year: finalFormData.year,
          description: finalFormData.description,
          fileUrl: finalFormData.fileUrl,
          fileName: finalFormData.fileName,
          uploadedBy: finalFormData.uploadedBy || 'Admin'
        })
        if (!result.success) {
          throw new Error(result.error || 'Failed to update question paper')
        }
      } else {
        // Create new question paper
        const result = await createQuestionPaper({
          subject: finalFormData.subject,
          type: finalFormData.type,
          semester: finalFormData.semester,
          year: finalFormData.year,
          description: finalFormData.description,
          fileUrl: finalFormData.fileUrl,
          fileName: finalFormData.fileName,
          uploadedBy: finalFormData.uploadedBy || 'Admin'
        })
        if (!result.success) {
          throw new Error(result.error || 'Failed to create question paper')
        }
      }

      onSave()
    } catch (error) {
      console.error('Error saving question paper:', error)
      alert('Error saving question paper')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {paper ? 'Edit Question Paper' : 'Add New Question Paper'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Data Structures and Algorithms"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exam Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="mid">Mid Semester</option>
                  <option value="sem">Semester End</option>
                  <option value="final">Final Exam</option>
                  <option value="quiz">Quiz</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Semester *
                </label>
                <select
                  required
                  value={formData.semester}
                  onChange={(e) => setFormData({...formData, semester: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year *
                </label>
                <select
                  required
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[2024, 2023, 2022, 2021, 2020].map(year => (
                    <option key={year} value={year.toString()}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of the question paper content..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question Paper File *
              </label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-blue-300 rounded-lg px-4 py-3 flex items-center space-x-2 transition-colors">
                    <Upload className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-blue-600 font-medium">
                      {uploadingFile ? 'Uploading...' : 'Choose File'}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={uploadingFile}
                    />
                  </label>
                  
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Or enter file URL"
                      value={formData.fileUrl}
                      onChange={(e) => setFormData({...formData, fileUrl: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
                
                {formData.fileName && (
                  <div className="text-sm text-gray-600">
                    Selected: {formData.fileName}
                  </div>
                )}
                
                <p className="text-xs text-gray-500">
                  Upload a PDF, JPEG, or PNG file up to 10MB
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Uploaded By
              </label>
              <input
                type="text"
                value={formData.uploadedBy}
                onChange={(e) => setFormData({...formData, uploadedBy: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Professor name or department"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || uploadingFile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Saving...' : paper ? 'Update Question Paper' : 'Add Question Paper'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}