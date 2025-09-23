// File URL utilities for handling and normalizing file paths

export const normalizeFileUrl = (url: string, type: 'notes' | 'question-papers' | 'events' = 'notes'): string => {
  if (!url) return ''
  
  // If it's already a full URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  
  // If it starts with /uploads/, it's already correct
  if (url.startsWith('/uploads/')) {
    return url
  }
  
  // If it's a local file path, convert to uploads path
  if (url.includes('\\') || url.includes('C:') || url.includes('c:')) {
    const fileName = url.split(/[\\\/]/).pop() || 'document.pdf'
    return `/uploads/${type}/${fileName}`
  }
  
  // If it's just a filename, add uploads path
  if (!url.includes('/')) {
    return `/uploads/${type}/${url}`
  }
  
  // Default case - return as is with leading slash if needed
  return url.startsWith('/') ? url : `/${url}`
}

export const isValidFileUrl = (url: string): boolean => {
  if (!url) return false
  
  // Check if it's a valid URL format
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
  
  // Check if it's a valid relative path
  if (url.startsWith('/uploads/') || url.startsWith('/')) {
    return true
  }
  
  return false
}

export const getFileExtension = (url: string): string => {
  const fileName = url.split('/').pop() || ''
  const extension = fileName.split('.').pop()?.toLowerCase() || ''
  return extension
}

export const isImageFile = (url: string): boolean => {
  const extension = getFileExtension(url)
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)
}

export const isPdfFile = (url: string): boolean => {
  const extension = getFileExtension(url)
  return extension === 'pdf'
}

export const getFileTypeIcon = (url: string): string => {
  const extension = getFileExtension(url)
  
  switch (extension) {
    case 'pdf':
      return '📄'
    case 'doc':
    case 'docx':
      return '📝'
    case 'ppt':
    case 'pptx':
      return '📊'
    case 'xls':
    case 'xlsx':
      return '📈'
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return '🖼️'
    default:
      return '📁'
  }
}