import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const note = await prisma.note.findUnique({
      where: { id: params.id }
    })

    if (!note) {
      return NextResponse.json(
        { message: 'Note not found' },
        { status: 404 }
      )
    }

    // Transform data to match frontend expectations
    const transformedNote = {
      id: note.id,
      title: note.title,
      subject: note.subjectName,
      semester: parseInt(note.semester),
      year: note.year,
      type: note.type,
      fileSize: note.fileSize ? `${(note.fileSize / 1024 / 1024).toFixed(1)} MB` : '10.0 MB',
      fileUrl: note.fileUrl,
      fileName: note.fileName,
      downloads: note.downloads,
      uploadedDate: note.createdAt.toISOString().split('T')[0],
      uploadedBy: note.uploadedBy,
      description: note.description || '',
      chapters: note.chapters ? JSON.parse(note.chapters) : [],
      isPublic: note.isActive,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString()
    }

    return NextResponse.json(transformedNote)

  } catch (error) {
    console.error('Error fetching note:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const {
      title,
      subjectName,
      semester,
      year,
      type,
      description,
      fileUrl,
      fileName,
      fileSize,
      chapters,
      uploadedBy
    } = body

    const note = await prisma.note.update({
      where: { id: params.id },
      data: {
        title,
        subjectName,
        semester: semester?.toString(),
        year: year?.toString(),
        type,
        description,
        fileUrl,
        fileName,
        fileSize,
        chapters: Array.isArray(chapters) ? JSON.stringify(chapters) : chapters,
        uploadedBy
      }
    })

    // Transform response
    const transformedNote = {
      id: note.id,
      title: note.title,
      subject: note.subjectName,
      semester: parseInt(note.semester),
      year: note.year,
      type: note.type,
      fileSize: note.fileSize ? `${(note.fileSize / 1024 / 1024).toFixed(1)} MB` : '10.0 MB',
      fileUrl: note.fileUrl,
      fileName: note.fileName,
      downloads: note.downloads,
      uploadedDate: note.createdAt.toISOString().split('T')[0],
      uploadedBy: note.uploadedBy,
      description: note.description || '',
      chapters: note.chapters ? JSON.parse(note.chapters) : [],
      isPublic: note.isActive,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString()
    }

    return NextResponse.json({
      message: 'Note updated successfully',
      note: transformedNote
    })

  } catch (error) {
    console.error('Error updating note:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.note.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'Note deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting note:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}