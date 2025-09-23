'use client'

import { useState, useEffect, useCallback } from 'react'

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

export function useQuestionPapers(disableAutoRefresh = false) {
  const [questionPapers, setQuestionPapers] = useState<QuestionPaper[]>([])
  const [stats, setStats] = useState<QuestionPaperStats>({
    total: 0,
    byType: {},
    bySemester: {},
    totalDownloads: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchQuestionPapers = useCallback(async (params: Record<string, string> = {}) => {
    try {
      // Only show loading for initial load, not for refreshes
      if (questionPapers.length === 0) {
        setLoading(true)
      }
      setError(null)

      const queryParams = new URLSearchParams({
        limit: '100',
        ...params
      })

      const response = await fetch(`/api/question-papers?${queryParams}`)
      const data = await response.json()

      if (response.ok) {
        const papers: QuestionPaper[] = data.papers || []
        setQuestionPapers(papers)

        // Calculate statistics
        const totalDownloads = papers.reduce((sum, paper) => sum + paper.downloads, 0)
        const byType = papers.reduce((acc, paper) => {
          acc[paper.type] = (acc[paper.type] || 0) + 1
          return acc
        }, {} as Record<string, number>)
        const bySemester = papers.reduce((acc, paper) => {
          acc[paper.semester] = (acc[paper.semester] || 0) + 1
          return acc
        }, {} as Record<string, number>)

        setStats({
          total: papers.length,
          byType,
          bySemester,
          totalDownloads
        })

        setLastUpdated(new Date())
      } else {
        throw new Error(data.message || 'Failed to fetch question papers')
      }
    } catch (err) {
      setError('Failed to load question papers')
      console.error('Error fetching question papers:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshQuestionPapers = useCallback(() => {
    fetchQuestionPapers()
  }, [fetchQuestionPapers])

  // Auto-refresh every 10 minutes (only if not disabled)
  useEffect(() => {
    fetchQuestionPapers()
    
    if (!disableAutoRefresh) {
      const interval = setInterval(() => {
        fetchQuestionPapers()
      }, 600000) // 10 minutes
      return () => clearInterval(interval)
    }
  }, [fetchQuestionPapers, disableAutoRefresh])

  const createQuestionPaper = async (paperData: {
    subject: string
    type: string
    semester: number
    year: string
    description?: string
    fileUrl: string
    fileName: string
    uploadedBy?: string
  }) => {
    try {
      const response = await fetch('/api/question-papers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paperData),
      })

      const data = await response.json()

      if (response.ok) {
        await refreshQuestionPapers()
        return { success: true, paper: data.paper }
      } else {
        return { success: false, error: data.message || 'Failed to create question paper' }
      }
    } catch (error) {
      console.error('Error creating question paper:', error)
      return { success: false, error: 'Network error' }
    }
  }

  const updateQuestionPaper = async (paperId: string, paperData: Partial<QuestionPaper>) => {
    try {
      const response = await fetch(`/api/question-papers/${paperId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paperData),
      })

      const data = await response.json()

      if (response.ok) {
        await refreshQuestionPapers()
        return { success: true, paper: data.paper }
      } else {
        return { success: false, error: data.message || 'Failed to update question paper' }
      }
    } catch (error) {
      console.error('Error updating question paper:', error)
      return { success: false, error: 'Network error' }
    }
  }

  const deleteQuestionPaper = async (paperId: string) => {
    try {
      const response = await fetch(`/api/question-papers/${paperId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (response.ok) {
        await refreshQuestionPapers()
        return { success: true }
      } else {
        return { success: false, error: data.message || 'Failed to delete question paper' }
      }
    } catch (error) {
      console.error('Error deleting question paper:', error)
      return { success: false, error: 'Network error' }
    }
  }

  const incrementDownloadCount = async (paperId: string) => {
    try {
      const response = await fetch('/api/question-papers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: paperId }),
      })

      if (response.ok) {
        // Refresh the list to get updated download count
        await refreshQuestionPapers()
      }
    } catch (error) {
      console.error('Error updating download count:', error)
    }
  }

  return {
    questionPapers,
    stats,
    loading,
    error,
    lastUpdated,
    refreshQuestionPapers,
    createQuestionPaper,
    updateQuestionPaper,
    deleteQuestionPaper,
    incrementDownloadCount,
    fetchQuestionPapers
  }
}