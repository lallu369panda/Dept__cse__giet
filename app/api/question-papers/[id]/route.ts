import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get single question paper
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const questionPaper = await prisma.questionPaper.findUnique({
      where: { id }
    })

    if (!questionPaper) {
      return NextResponse.json(
        { message: 'Question paper not found' },
        { status: 404 }
      )
    }

    // Transform to match frontend expectations
    const transformedPaper = {
      id: questionPaper.id,
      title: `${questionPaper.subjectName} - ${questionPaper.examType}`,
      subject: questionPaper.subjectName,
      semester: parseInt(questionPaper.semester),
      year: questionPaper.year,
      type: questionPaper.examType,
      duration: '3 hours',
      marks: '100',
      difficulty: 'Medium',
      fileSize: questionPaper.fileSize ? `${(questionPaper.fileSize / 1024 / 1024).toFixed(1)} MB` : '2.5 MB',
      fileUrl: questionPaper.fileUrl,
      fileName: questionPaper.fileName,
      downloads: questionPaper.downloads,
      rating: 4.5,
      uploadedDate: questionPaper.createdAt.toISOString().split('T')[0],
      uploadedBy: questionPaper.uploadedBy,
      description: questionPaper.description || '',
      isPublic: questionPaper.isActive,
      createdAt: questionPaper.createdAt.toISOString(),
      updatedAt: questionPaper.updatedAt.toISOString()
    }

    return NextResponse.json(transformedPaper)
  } catch (error) {
    console.error('Error fetching question paper:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update question paper
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const {
      subjectName,
      examType,
      semester,
      year,
      description,
      fileUrl,
      fileName,
      fileSize,
      isActive
    } = body

    const questionPaper = await prisma.questionPaper.update({
      where: { id },
      data: {
        subjectName,
        examType,
        semester: semester?.toString(),
        year: year?.toString(),
        description,
        fileUrl,
        fileName,
        fileSize,
        isActive: isActive !== undefined ? isActive : true
      }
    })

    return NextResponse.json({
      message: 'Question paper updated successfully',
      paper: {
        id: questionPaper.id,
        title: `${questionPaper.subjectName} - ${questionPaper.examType}`,
        subject: questionPaper.subjectName,
        semester: parseInt(questionPaper.semester),
        year: questionPaper.year,
        type: questionPaper.examType,
        fileUrl: questionPaper.fileUrl,
        fileName: questionPaper.fileName,
        description: questionPaper.description,
        downloads: questionPaper.downloads,
        isActive: questionPaper.isActive,
        createdAt: questionPaper.createdAt.toISOString(),
        updatedAt: questionPaper.updatedAt.toISOString()
      }
    })
  } catch (error) {
    console.error('Error updating question paper:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete question paper
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    await prisma.questionPaper.delete({
      where: { id }
    })

    return NextResponse.json({
      message: 'Question paper deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting question paper:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}