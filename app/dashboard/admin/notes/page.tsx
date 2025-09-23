'use client'

import { useState, useEffect } from 'react'
import { useNotes, Note } from '../../../../hooks/useNotes'
import AdminLayout from '@/components/layout/AdminLayout'

interface AdminNotesPageProps {}

export default function AdminNotesPage({}: AdminNotesPageProps) {
  const { 
    notes, 
    loading, 
    error, 
    pagination, 
    isEditing,
    setIsEditing,
    fetchNotes, 
    createNote, 
    updateNote, 
    deleteNote 
  } = useNotes(true) // Disable auto-refresh to prevent editing interruption

  const [showAddModal, setShowAddModal] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [filters, setFilters] = useState({
    semester: 'all',
    type: 'all',
    year: 'all',
    search: ''
  })
  const [currentPage, setCurrentPage] = useState(1)

  // Statistics
  const [statistics, setStatistics] = useState({
    totalNotes: 0,
    bySemester: {} as Record<string, number>,
    byType: {} as Record<string, number>,
    byYear: {} as Record<string, number>
  })

  useEffect(() => {
    const filters_with_page = { ...filters, page: currentPage }
    fetchNotes(filters_with_page)
  }, [filters, currentPage])

  useEffect(() => {
    if (notes.length > 0) {
      const stats = {
        totalNotes: pagination.totalNotes,
        bySemester: {} as Record<string, number>,
        byType: {} as Record<string, number>,
        byYear: {} as Record<string, number>
      }

      notes.forEach(note => {
        stats.bySemester[note.semester] = (stats.bySemester[note.semester] || 0) + 1
        stats.byType[note.type] = (stats.byType[note.type] || 0) + 1
        stats.byYear[note.year] = (stats.byYear[note.year] || 0) + 1
      })

      setStatistics(stats)
    }
  }, [notes, pagination.totalNotes])

  const handleEdit = (note: Note) => {
    setEditingNote(note)
    setShowAddModal(true)
    setIsEditing(true)
  }

  const handleDelete = async (note: Note) => {
    if (confirm(`Are you sure you want to delete "${note.title}"?`)) {
      try {
        await deleteNote(note.id)
      } catch (error) {
        console.error('Error deleting note:', error)
      }
    }
  }

  const handleAddNew = () => {
    setEditingNote(null)
    setShowAddModal(true)
    setIsEditing(true)
  }

  const handleCloseModal = () => {
    setShowAddModal(false)
    setEditingNote(null)
    setIsEditing(false)
  }

  const handleSaveNote = () => {
    setShowAddModal(false)
    setEditingNote(null)
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <AdminLayout currentPage="/dashboard/admin/notes">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notes Management</h1>
          <p className="text-gray-600">Manage study notes and materials for students</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Notes</h3>
            <p className="text-3xl font-bold text-blue-600">{statistics.totalNotes}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">By Semester</h3>
            <div className="space-y-1">
              {Object.entries(statistics.bySemester).map(([sem, count]) => (
                <div key={sem} className="flex justify-between text-sm">
                  <span>Sem {sem}:</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">By Type</h3>
            <div className="space-y-1">
              {Object.entries(statistics.byType).map(([type, count]) => (
                <div key={type} className="flex justify-between text-sm">
                  <span>{type}:</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">By Year</h3>
            <div className="space-y-1">
              {Object.entries(statistics.byYear).map(([year, count]) => (
                <div key={year} className="flex justify-between text-sm">
                  <span>{year}:</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              {/* Semester Filter */}
              <select
                value={filters.semester}
                onChange={(e) => {
                  setFilters({...filters, semester: e.target.value})
                  setCurrentPage(1)
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Semesters</option>
                {[1,2,3,4,5,6,7,8].map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>

              {/* Type Filter */}
              <select
                value={filters.type}
                onChange={(e) => {
                  setFilters({...filters, type: e.target.value})
                  setCurrentPage(1)
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="Complete Notes">Complete Notes</option>
                <option value="Quick Reference">Quick Reference</option>
                <option value="Chapter Notes">Chapter Notes</option>
                <option value="Formula Sheets">Formula Sheets</option>
              </select>

              {/* Year Filter */}
              <select
                value={filters.year}
                onChange={(e) => {
                  setFilters({...filters, year: e.target.value})
                  setCurrentPage(1)
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>

              {/* Search */}
              <input
                type="text"
                placeholder="Search notes..."
                value={filters.search}
                onChange={(e) => {
                  setFilters({...filters, search: e.target.value})
                  setCurrentPage(1)
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[200px]"
              />
            </div>

            <button
              onClick={handleAddNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add New Note
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Notes Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title & Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Semester
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {notes.map((note) => (
                  <tr key={note.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{note.title}</div>
                        <div className="text-sm text-gray-500">{note.subject}</div>
                        {note.description && (
                          <div className="text-xs text-gray-400 mt-1 truncate max-w-xs">
                            {note.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      Semester {note.semester}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {note.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {note.year}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {note.downloads}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {note.uploadedBy}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(note)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => window.open(note.fileUrl, '_blank')}
                          className="text-green-600 hover:text-green-900"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(note)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {notes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No notes found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing page {pagination.currentPage} of {pagination.totalPages} 
              ({pagination.totalNotes} total notes)
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={!pagination.hasPrev}
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={!pagination.hasNext}
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <NoteModal
          note={editingNote}
          onClose={handleCloseModal}
          onSave={handleSaveNote}
          createNote={createNote}
          updateNote={updateNote}
        />
      )}
      </div>
    </AdminLayout>
  )
}

function NoteModal({ 
  note, 
  onClose, 
  onSave,
  createNote,
  updateNote
}: { 
  note: Note | null
  onClose: () => void
  onSave: () => void
  createNote: (data: any) => Promise<Note>
  updateNote: (id: string, data: any) => Promise<Note>
}) {
  const [formData, setFormData] = useState({
    title: note?.title || '',
    subject: note?.subject || '',
    semester: note?.semester || 1,
    year: note?.year || new Date().getFullYear().toString(),
    type: note?.type || 'Complete Notes',
    description: note?.description || '',
    fileUrl: note?.fileUrl || '',
    fileName: note?.fileName || '',
    fileSize: note?.fileSize || '',
    chapters: note?.chapters?.join(', ') || '',
    uploadedBy: note?.uploadedBy || 'Admin'
  })
  const [loading, setLoading] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)

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
      return `/uploads/notes/${fileName}`
    }
    
    // If it's just a filename, add uploads path
    if (!url.includes('/')) {
      return `/uploads/notes/${url}`
    }
    
    // Default case - return as is with leading slash if needed
    return url.startsWith('/') ? url : `/${url}`
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingFile(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'note')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setFormData(prev => ({
          ...prev,
          fileUrl: normalizeFileUrl(data.fileUrl || data.url),
          fileName: file.name,
          fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`
        }))
      } else {
        alert('Failed to upload file')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file')
    } finally {
      setUploadingFile(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate required fields
      if (!formData.fileUrl.trim()) {
        alert('Please provide a file URL or upload a file')
        return
      }

      const chapters = formData.chapters
        .split(',')
        .map(ch => ch.trim())
        .filter(ch => ch.length > 0)

      const noteData = {
        ...formData,
        chapters,
        semester: parseInt(formData.semester.toString()),
        fileUrl: normalizeFileUrl(formData.fileUrl),
      }

      if (note) {
        await updateNote(note.id, noteData)
      } else {
        await createNote(noteData)
      }

      onSave()
    } catch (error) {
      console.error('Error saving note:', error)
      alert('Error saving note')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {note ? 'Edit Note' : 'Add New Note'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Data Structures Complete Notes"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Complete Notes">Complete Notes</option>
                  <option value="Quick Reference">Quick Reference</option>
                  <option value="Chapter Notes">Chapter Notes</option>
                  <option value="Formula Sheets">Formula Sheets</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of the notes content..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chapters Covered (comma-separated)
              </label>
              <input
                type="text"
                value={formData.chapters}
                onChange={(e) => setFormData({...formData, chapters: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Arrays, Linked Lists, Stacks and Queues"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                File URL *
              </label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <label className="flex-shrink-0">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      onChange={handleFileUpload}
                      className="sr-only"
                    />
                    <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                      Choose File
                    </span>
                  </label>
                  
                  <div className="flex-1">
                    <input
                      type="text"
                      required
                      placeholder="Enter file URL (e.g., /uploads/notes/data-structures.pdf)"
                      value={formData.fileUrl}
                      onChange={(e) => setFormData({...formData, fileUrl: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
                
                {uploadingFile && (
                  <div className="text-sm text-blue-600">
                    Uploading file...
                  </div>
                )}
                
                {formData.fileName && (
                  <div className="text-sm text-gray-600">
                    Selected: {formData.fileName} {formData.fileSize && `(${formData.fileSize})`}
                  </div>
                )}

                {formData.fileUrl && (
                  <div className="bg-green-50 border border-green-200 rounded p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800">Current File URL:</span>
                      <button
                        type="button"
                        onClick={() => window.open(formData.fileUrl, '_blank')}
                        className="text-xs text-green-600 hover:text-green-800 underline"
                      >
                        Preview
                      </button>
                    </div>
                    <div className="text-sm text-green-700 font-mono mt-1 break-all">
                      {formData.fileUrl}
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, fileUrl: '/uploads/notes/'})}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                  >
                    /uploads/notes/
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, fileUrl: 'https://'})}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                  >
                    https://
                  </button>
                </div>
                
                <p className="text-xs text-gray-500">
                  Upload a PDF, DOC, PPT file or enter the file URL directly. Click buttons above for quick templates.
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
                placeholder="Your name"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || uploadingFile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Saving...' : (note ? 'Update Note' : 'Add Note')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}