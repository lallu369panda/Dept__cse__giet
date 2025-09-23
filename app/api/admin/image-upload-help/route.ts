import { NextResponse } from 'next/server'

export async function GET() {
  const instructions = {
    title: "Admin Image Upload Instructions",
    steps: [
      {
        step: 1,
        title: "Access Events Management",
        description: "Go to Admin Dashboard > Events Management"
      },
      {
        step: 2,
        title: "Add/Edit Event",
        description: "Click 'Add Event' or edit an existing event"
      },
      {
        step: 3,
        title: "Upload Image",
        description: "In the Event Image section, either upload a file or enter an image URL"
      },
      {
        step: 4,
        title: "Image Requirements",
        description: "Supported formats: JPEG, PNG, WebP. Maximum size: 5MB"
      },
      {
        step: 5,
        title: "Preview & Save",
        description: "Preview the image and save the event"
      }
    ],
    supportedFormats: ["JPEG", "PNG", "WebP"],
    maxFileSize: "5MB",
    uploadPath: "/public/uploads/events/",
    examples: [
      {
        eventType: "Conference",
        imageTip: "Use professional conference banners or logos"
      },
      {
        eventType: "Workshop",
        imageTip: "Use relevant technology or hands-on images"
      },
      {
        eventType: "Competition",
        imageTip: "Use exciting, competitive-themed images"
      }
    ]
  }

  return NextResponse.json(instructions)
}