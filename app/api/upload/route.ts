import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string // 'question-paper', 'notes', 'announcement', etc.

    if (!file) {
      return NextResponse.json(
        { message: 'No file uploaded' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = {
      'question-paper': ['.pdf', '.doc', '.docx'],
      'notes': ['.pdf', '.doc', '.docx', '.txt'],
      'announcement': ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
      'profile': ['.jpg', '.jpeg', '.png', '.gif']
    }

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    const allowedExtensions = allowedTypes[type as keyof typeof allowedTypes] || ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png']

    if (!allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { message: `Invalid file type. Allowed types: ${allowedExtensions.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { message: 'File size too large. Maximum size is 10MB' },
        { status: 400 }
      )
    }

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads', type)
    await mkdir(uploadDir, { recursive: true })

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileName = `${timestamp}_${randomString}${fileExtension}`
    const filePath = join(uploadDir, fileName)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Return file information
    const fileUrl = `/uploads/${type}/${fileName}`
    
    return NextResponse.json({
      message: 'File uploaded successfully',
      file: {
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl,
        uploadedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
