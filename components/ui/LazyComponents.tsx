import dynamic from 'next/dynamic'
import { Skeleton } from './Skeleton'

// Lazy load admin pages for better initial load performance
export const LazyAdminDashboard = dynamic(
  () => import('../../app/dashboard/admin/page'),
  {
    loading: () => (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6 w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2 w-20"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="h-6 bg-gray-200 rounded mb-4 w-32"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="h-6 bg-gray-200 rounded mb-4 w-32"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
)

export const LazyQuestionPapersAdmin = dynamic(
  () => import('../../app/dashboard/admin/question-papers/page'),
  {
    loading: () => (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
        <Skeleton className="w-full h-96" />
      </div>
    ),
    ssr: false
  }
)

export const LazyNotesAdmin = dynamic(
  () => import('../../app/dashboard/admin/notes/page'),
  {
    loading: () => (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    ),
    ssr: false
  }
)

export const LazyEventsAdmin = dynamic(
  () => import('../../app/dashboard/admin/events/page'),
  {
    loading: () => (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
              <Skeleton className="h-6 mb-2" />
              <Skeleton className="h-4 mb-4 w-20" />
              <Skeleton className="h-16 mb-4" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    ssr: false
  }
)

// Lazy load student dashboard
export const LazyStudentDashboard = dynamic(
  () => import('../../app/dashboard/student/page'),
  {
    loading: () => (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    ),
    ssr: false
  }
)