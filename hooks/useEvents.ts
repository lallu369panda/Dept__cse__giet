'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: string
  category: string
  attendees: number
  maxAttendees?: number
  image?: string
  featured: boolean
  status: string
  organizer: string
  contactEmail: string
  requirements?: string
  createdAt: string
  updatedAt: string
}

interface EventStats {
  totalEvents: number
  upcomingEvents: number
  ongoingEvents: number
  completedEvents: number
  featuredEvents: number
}

export function useEvents(disableAutoRefresh = false) {
  const [events, setEvents] = useState<Event[]>([])
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [stats, setStats] = useState<EventStats>({
    totalEvents: 0,
    upcomingEvents: 0,
    ongoingEvents: 0,
    completedEvents: 0,
    featuredEvents: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isEditing, setIsEditing] = useState(false)

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch all events
      const allEventsResponse = await fetch('/api/events?limit=100')
      const allEventsData = await allEventsResponse.json()

      // Fetch featured events
      const featuredResponse = await fetch('/api/events?featured=true&limit=10')
      const featuredData = await featuredResponse.json()

      // Fetch upcoming events
      const upcomingResponse = await fetch('/api/events?status=upcoming&limit=10')
      const upcomingData = await upcomingResponse.json()

      if (allEventsResponse.ok && featuredResponse.ok && upcomingResponse.ok) {
        const allEvents: Event[] = allEventsData.events || []
        setEvents(allEvents)
        setFeaturedEvents(featuredData.events || [])
        setUpcomingEvents(upcomingData.events || [])

        // Calculate statistics
        const totalEvents = allEvents.length
        const upcomingCount = allEvents.filter(e => e.status === 'upcoming').length
        const ongoingCount = allEvents.filter(e => e.status === 'ongoing').length
        const completedCount = allEvents.filter(e => e.status === 'completed').length
        const featuredCount = allEvents.filter(e => e.featured).length

        setStats({
          totalEvents,
          upcomingEvents: upcomingCount,
          ongoingEvents: ongoingCount,
          completedEvents: completedCount,
          featuredEvents: featuredCount
        })

        setLastUpdated(new Date())
      } else {
        throw new Error('Failed to fetch events')
      }
    } catch (err) {
      setError('Failed to load events')
      console.error('Error fetching events:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshEvents = useCallback(() => {
    fetchEvents()
  }, [fetchEvents])

  // Auto-refresh every 5 minutes (only if not disabled and not editing)
  useEffect(() => {
    fetchEvents()
    
    if (!disableAutoRefresh) {
      const interval = setInterval(() => {
        if (!isEditing) {
          fetchEvents()
        }
      }, 300000) // 5 minutes instead of 30 seconds
      return () => clearInterval(interval)
    }
  }, [fetchEvents, disableAutoRefresh, isEditing])

  const createEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'attendees'>) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })

      const data = await response.json()

      if (response.ok) {
        // Refresh all event data after creation
        await refreshEvents()
        return { success: true, event: data.event }
      } else {
        return { success: false, error: data.message || 'Failed to create event' }
      }
    } catch (error) {
      console.error('Error creating event:', error)
      return { success: false, error: 'Network error' }
    }
  }

  const updateEvent = async (eventId: string, eventData: Partial<Event>) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })

      const data = await response.json()

      if (response.ok) {
        // Refresh all event data after update
        await refreshEvents()
        return { success: true, event: data.event }
      } else {
        return { success: false, error: data.message || 'Failed to update event' }
      }
    } catch (error) {
      console.error('Error updating event:', error)
      return { success: false, error: 'Network error' }
    }
  }

  const deleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (response.ok) {
        // Refresh all event data after deletion
        await refreshEvents()
        return { success: true }
      } else {
        return { success: false, error: data.message || 'Failed to delete event' }
      }
    } catch (error) {
      console.error('Error deleting event:', error)
      return { success: false, error: 'Network error' }
    }
  }

  return {
    events,
    featuredEvents,
    upcomingEvents,
    stats,
    loading,
    error,
    lastUpdated,
    refreshEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    setIsEditing
  }
}

// Global event update notifier
export class EventUpdateNotifier {
  private static instance: EventUpdateNotifier
  private subscribers: Set<() => void> = new Set()

  static getInstance() {
    if (!EventUpdateNotifier.instance) {
      EventUpdateNotifier.instance = new EventUpdateNotifier()
    }
    return EventUpdateNotifier.instance
  }

  subscribe(callback: () => void) {
    this.subscribers.add(callback)
    return () => {
      this.subscribers.delete(callback)
    }
  }

  notify() {
    this.subscribers.forEach(callback => callback())
  }
}

export const eventNotifier = EventUpdateNotifier.getInstance()