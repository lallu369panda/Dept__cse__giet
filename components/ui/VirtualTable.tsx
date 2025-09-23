import React, { useState, useMemo, useCallback } from 'react'

interface VirtualTableProps<T> {
  data: T[]
  columns: Array<{
    key: keyof T
    header: string
    render?: (item: T) => React.ReactNode
    width?: string
  }>
  rowHeight?: number
  maxVisibleRows?: number
  onRowClick?: (item: T) => void
  loading?: boolean
  className?: string
}

export function VirtualTable<T extends { id: string | number }>({
  data,
  columns,
  rowHeight = 60,
  maxVisibleRows = 10,
  onRowClick,
  loading = false,
  className = ''
}: VirtualTableProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)

  const containerHeight = maxVisibleRows * rowHeight
  
  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / rowHeight)
    const end = Math.min(start + maxVisibleRows + 1, data.length)
    return { start, end }
  }, [scrollTop, rowHeight, maxVisibleRows, data.length])

  const visibleData = useMemo(() => {
    return data.slice(visibleRange.start, visibleRange.end)
  }, [data, visibleRange])

  const totalHeight = data.length * rowHeight
  const offsetY = visibleRange.start * rowHeight

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  if (loading) {
    return (
      <div className={`border rounded-lg overflow-hidden ${className}`}>
        <div className="bg-gray-50 px-6 py-3 border-b">
          <div className="flex space-x-4">
            {columns.map((col, index) => (
              <div key={index} className="flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="divide-y">
          {Array.from({ length: maxVisibleRows }, (_, index) => (
            <div key={index} className="px-6 py-4 animate-pulse">
              <div className="flex space-x-4">
                {columns.map((_, colIndex) => (
                  <div key={colIndex} className="flex-1">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`border rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gray-50 px-6 py-3 border-b">
        <div className="flex space-x-4">
          {columns.map((column, index) => (
            <div 
              key={index} 
              className="flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider"
              style={{ width: column.width }}
            >
              {column.header}
            </div>
          ))}
        </div>
      </div>

      {/* Virtual Scrollable Content */}
      <div
        className="relative overflow-auto bg-white"
        style={{ height: containerHeight }}
        onScroll={handleScroll}
      >
        <div style={{ height: totalHeight }}>
          <div
            style={{
              transform: `translateY(${Math.floor(offsetY)}px)`,
              position: 'relative'
            }}
          >
            {visibleData.map((item, index) => (
              <div
                key={item.id}
                className={`flex space-x-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
                style={{ height: rowHeight }}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column, colIndex) => (
                  <div 
                    key={colIndex} 
                    className="flex-1 flex items-center"
                    style={{ width: column.width }}
                  >
                    {column.render 
                      ? column.render(item)
                      : String(item[column.key] || '')
                    }
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with info */}
      {data.length > maxVisibleRows && (
        <div className="bg-gray-50 px-6 py-2 border-t text-sm text-gray-500 text-center">
          Showing {visibleRange.start + 1}-{Math.min(visibleRange.end, data.length)} of {data.length} items
        </div>
      )}
    </div>
  )
}

// Pagination component for efficient loading
interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  loading?: boolean
}

export function OptimizedPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  loading = false
}: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeStart = Math.max(2, currentPage - delta)
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta)

    if (currentPage - delta > 2) {
      range.push(1, '...')
    } else {
      range.push(1)
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      range.push(i)
    }

    if (currentPage + delta < totalPages - 1) {
      range.push('...', totalPages)
    } else if (totalPages > 1) {
      range.push(totalPages)
    }

    return range
  }

  const visiblePages = getVisiblePages()
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || loading}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || loading}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startItem}</span> to{' '}
            <span className="font-medium">{endItem}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1 || loading}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              ←
            </button>
            
            {visiblePages.map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                  >
                    ...
                  </span>
                )
              }
              
              const isActive = page === currentPage
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page as number)}
                  disabled={loading}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    isActive
                      ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {page}
                </button>
              )
            })}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || loading}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              →
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}