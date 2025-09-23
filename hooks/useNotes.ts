import { useState, useEffect, useCallback } from 'react'

export interface Note {
  id: string
  title: string
  subject: string
  semester: number
  year: string
  type: string
  fileSize: string
  fileUrl: string
  fileName: string
  downloads: number
  rating?: number
  uploadedDate: string
  uploadedBy: string
  description: string
  chapters: string[]
  tags?: string[]
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

interface NotesFilters {
  semester?: string
  subject?: string
  year?: string
  type?: string
  search?: string
  page?: number
  limit?: number
}

interface NotesPagination {
  currentPage: number
  totalPages: number
  totalNotes: number
  hasNext: boolean
  hasPrev: boolean
}

export const useNotes = (disableAutoRefresh = false) => {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<NotesPagination>({
    currentPage: 1,
    totalPages: 1,
    totalNotes: 0,
    hasNext: false,
    hasPrev: false
  })
  const [isEditing, setIsEditing] = useState(false)

  const fetchNotes = useCallback(async (filters: NotesFilters = {}) => {
    if (isEditing && disableAutoRefresh) return
    
    try {
      setError(null)
      const params = new URLSearchParams()
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value.toString())
      })

      const response = await fetch(`/api/notes?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch notes')
      }

      const data = await response.json()
      setNotes(data.notes || [])
      setPagination(data.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalNotes: 0,
        hasNext: false,
        hasPrev: false
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching notes:', err)
    } finally {
      setLoading(false)
    }
  }, [isEditing, disableAutoRefresh])

  const createNote = async (noteData: Omit<Note, 'id' | 'downloads' | 'uploadedDate' | 'isPublic' | 'createdAt' | 'updatedAt' | 'rating' | 'tags'>) => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: noteData.title,
          subject: noteData.subject,
          semester: noteData.semester,
          year: noteData.year,
          type: noteData.type,
          description: noteData.description,
          fileUrl: noteData.fileUrl,
          fileName: noteData.fileName,
          fileSize: noteData.fileSize ? parseInt(noteData.fileSize.replace(/[^\d]/g, '')) * 1024 * 1024 : null,
          chapters: noteData.chapters,
          uploadedBy: noteData.uploadedBy
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create note')
      }

      const data = await response.json()
      await fetchNotes() // Refresh the list
      return data.note
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create note')
      throw error
    }
  }

  const updateNote = async (id: string, noteData: Partial<Note>) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: noteData.title,
          subjectName: noteData.subject,
          semester: noteData.semester,
          year: noteData.year,
          type: noteData.type,
          description: noteData.description,
          fileUrl: noteData.fileUrl,
          fileName: noteData.fileName,
          fileSize: noteData.fileSize ? parseInt(noteData.fileSize.replace(/[^\d]/g, '')) * 1024 * 1024 : null,
          chapters: noteData.chapters,
          uploadedBy: noteData.uploadedBy
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update note')
      }

      const data = await response.json()
      await fetchNotes() // Refresh the list
      return data.note
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update note')
      throw error
    }
  }

  const deleteNote = async (id: string) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to delete note')
      }

      await fetchNotes() // Refresh the list
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete note')
      throw error
    }
  }

  const incrementDownloads = async (id: string) => {
    try {
      // Update local state immediately for better UX
      setNotes(prev => prev.map(note => 
        note.id === id ? { ...note, downloads: note.downloads + 1 } : note
      ))

      // Note: You might want to add an API endpoint for this
      // For now, it just updates the local state
    } catch (error) {
      console.error('Error incrementing downloads:', error)
    }
  }

  // Auto-refresh every 5 minutes if not disabled
  useEffect(() => {
    if (!disableAutoRefresh) {
      const interval = setInterval(() => {
        if (!isEditing) {
          fetchNotes()
        }
      }, 5 * 60 * 1000) // 5 minutes

      return () => clearInterval(interval)
    }
  }, [fetchNotes, isEditing, disableAutoRefresh])

  // Initial fetch
  useEffect(() => {
    fetchNotes()
  }, [])

  return {
    notes,
    loading,
    error,
    pagination,
    isEditing,
    setIsEditing,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    incrementDownloads,
    refetch: fetchNotes
  }
}