'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Home, 
  LogOut, 
  Calendar, 
  Users, 
  BookOpen, 
  FileText, 
  Settings, 
  BarChart3,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

interface AdminNavbarProps {
  currentPage?: string
}

export default function AdminNavbar({ currentPage }: AdminNavbarProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      signOut({ callbackUrl: '/', redirect: true })
    }
  }

  const handleHomeClick = () => {
    router.push('/')
  }

  const adminMenuItems = [
    {
      title: 'Dashboard',
      href: '/dashboard/admin',
      icon: BarChart3,
    },
    {
      title: 'Events',
      href: '/dashboard/admin/events',
      icon: Calendar,
    },
    {
      title: 'Question Papers',
      href: '/dashboard/admin/question-papers',
      icon: FileText,
    },
    {
      title: 'Notes',
      href: '/dashboard/admin/notes',
      icon: BookOpen,
    },
    {
      title: 'Users',
      href: '/dashboard/admin/users',
      icon: Users,
    },
    {
      title: 'Settings',
      href: '/dashboard/admin/settings',
      icon: Settings,
    },
  ]

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {/* Home Button */}
            <button
              onClick={handleHomeClick}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="text-sm font-medium hidden sm:block">Home</span>
            </button>
            
            <div className="text-gray-300 hidden sm:block">|</div>
            
            {/* Admin Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span className="text-lg font-semibold">Admin Panel</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    {adminMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          currentPage === item.href ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Current Page Indicator */}
            {currentPage && (
              <>
                <div className="text-gray-300 hidden md:block">•</div>
                <span className="text-sm text-gray-600 hidden md:block">
                  {adminMenuItems.find(item => item.href === currentPage)?.title || 'Admin'}
                </span>
              </>
            )}
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* User info */}
            <div className="text-sm text-gray-600 hidden sm:block">
              Welcome, <span className="font-medium">{session?.user?.name}</span>
            </div>
            
            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm hidden sm:block">Logout</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200">
            <div className="py-2 space-y-1">
              {adminMenuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    currentPage === item.href ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="px-4 py-2 text-sm text-gray-600">
                  Welcome, {session?.user?.name}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-30"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  )
}