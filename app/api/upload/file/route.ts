import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string || 'general'

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file size (10MB for question papers)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { message: 'File size too large. Maximum 10MB allowed.' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: 'Invalid file type. Only PDF, images, and Word documents are allowed.' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = path.extname(file.name)
    const fileName = `${type}-${timestamp}-${randomString}${fileExtension}`

    // Determine upload directory based on type
    let uploadDir: string
    switch (type) {
      case 'question-paper':
        uploadDir = path.join(process.cwd(), 'public', 'uploads', 'question-papers')
        break
      case 'notes':
        uploadDir = path.join(process.cwd(), 'public', 'uploads', 'notes')
        break
      default:
        uploadDir = path.join(process.cwd(), 'public', 'uploads', 'general')
    }

    // Create directory if it doesn't exist
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Write file to disk
    const filePath = path.join(uploadDir, fileName)
    await writeFile(filePath, buffer)

    // Generate public URL
    const publicUrl = `/uploads/${type === 'question-paper' ? 'question-papers' : type === 'notes' ? 'notes' : 'general'}/${fileName}`

    return NextResponse.json({
      message: 'File uploaded successfully',
      fileUrl: publicUrl,
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { message: 'Failed to upload file' },
      { status: 500 }
    )
  }
}