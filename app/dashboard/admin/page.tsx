'use client'

import Link from 'next/link'
import { useEvents } from '@/hooks/useEvents'
import AdminLayout from '@/components/layout/AdminLayout'
import { 
  Calendar, 
  Users, 
  BookOpen, 
  FileText, 
  Settings, 
  BarChart3,
  RefreshCw
} from 'lucide-react'

export default function AdminDashboard() {
  const { stats, loading, error, lastUpdated, refreshEvents } = useEvents()

  const adminMenuItems = [
    {
      title: 'Events Management',
      description: 'Create, edit, and manage department events',
      icon: Calendar,
      href: '/dashboard/admin/events',
      color: 'bg-blue-500'
    },
    {
      title: 'User Management',
      description: 'Manage students and faculty accounts',
      icon: Users,
      href: '/dashboard/admin/users',
      color: 'bg-green-500'
    },
    {
      title: 'Question Papers',
      description: 'Upload and manage question papers',
      icon: FileText,
      href: '/dashboard/admin/question-papers',
      color: 'bg-purple-500'
    },
    {
      title: 'Notes Management',
      description: 'Manage study notes and materials',
      icon: BookOpen,
      href: '/dashboard/admin/notes',
      color: 'bg-orange-500'
    },
    {
      title: 'Analytics',
      description: 'View system statistics and reports',
      icon: BarChart3,
      href: '/dashboard/admin/analytics',
      color: 'bg-red-500'
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: Settings,
      href: '/dashboard/admin/settings',
      color: 'bg-gray-500'
    }
  ]

  return (
    <AdminLayout currentPage="/dashboard/admin">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to Admin Dashboard
          </h2>
          <p className="text-gray-600">
            Manage and oversee all aspects of the CSE Department portal
          </p>
        </div>

        {/* Real-time Stats Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Live Dashboard - Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
            <button
              onClick={refreshEvents}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : stats.totalEvents}
                </div>
                <div className="text-sm text-gray-600">Total Events</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : stats.upcomingEvents}
                </div>
                <div className="text-sm text-gray-600">Upcoming Events</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : stats.featuredEvents}
                </div>
                <div className="text-sm text-gray-600">Featured Events</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : stats.completedEvents}
                </div>
                <div className="text-sm text-gray-600">Completed Events</div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminMenuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 group"
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 p-3 rounded-lg ${item.color}`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">New event "GIET-2025 Conference" was created</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">3 new student registrations</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Question paper uploaded for Semester 5</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}