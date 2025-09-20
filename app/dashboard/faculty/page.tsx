'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Header from '@/components/layout/Header'
import FacultyDashboard from '@/components/dashboard/FacultyDashboard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function FacultyDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/login')
      return
    }

    if (session.user?.role !== 'faculty') {
      router.push('/')
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return <LoadingSpinner />
  }

  if (!session || session.user?.role !== 'faculty') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lightBlue-50 to-lightBlue-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FacultyDashboard user={session.user} />
      </main>
    </div>
  )
}