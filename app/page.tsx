'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import Events from '@/components/home/Events'
import Footer from '@/components/layout/Footer'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (session) {
      // Redirect to student dashboard (only role available)
      router.push('/dashboard/student')
    } else {
      setLoading(false)
    }
  }, [session, status, router])

  if (status === 'loading' || loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lightBlue-50 to-lightBlue-100">
      <Header />
      <main>
        <Hero />
        <Features />
        <Events />
      </main>
      <Footer />
    </div>
  )
}
