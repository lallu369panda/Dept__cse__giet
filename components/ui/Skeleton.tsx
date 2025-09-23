import React from 'react'

interface SkeletonProps {
  className?: string
  rows?: number
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', rows = 1 }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="bg-gray-200 rounded h-4 mb-2"></div>
      ))}
    </div>
  )
}

export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({ 
  rows = 5, 
  cols = 6 
}) => {
  return (
    <div className="animate-pulse">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 px-6 py-3">
          <div className="flex space-x-4">
            {Array.from({ length: cols }).map((_, index) => (
              <div key={index} className="flex-1">
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Table Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4 border-b border-gray-200">
            <div className="flex space-x-4">
              {Array.from({ length: cols }).map((_, colIndex) => (
                <div key={colIndex} className="flex-1">
                  <div className={`h-4 bg-gray-200 rounded ${
                    colIndex === 0 ? 'w-full' : 
                    colIndex === cols - 1 ? 'w-1/2' : 'w-3/4'
                  }`}></div>
                  {colIndex === 0 && rowIndex % 2 === 0 && (
                    <div className="h-3 bg-gray-100 rounded mt-1 w-2/3"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const StatsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  )
}

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg border p-4 animate-pulse">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          </div>
          <div className="space-y-2 mb-3">
            <div className="h-3 bg-gray-100 rounded w-full"></div>
            <div className="h-3 bg-gray-100 rounded w-2/3"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-100 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  )
}