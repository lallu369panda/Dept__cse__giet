# CSE Department Website - API Documentation

## Overview
This document provides comprehensive documentation for all API endpoints in the CSE Department Website. All APIs follow RESTful conventions and return JSON responses.

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints require authentication via NextAuth.js. Include the session token in requests.

## API Endpoints

### 1. Authentication APIs

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123",
  "role": "student",
  "studentId": "CSE2024001",
  "department": "CSE",
  "semester": "3"
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "student",
    "department": "CSE",
    "studentId": "CSE2024001"
  }
}
```

### 2. Events APIs

#### GET `/api/events`
Get all events with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by event category
- `status` (optional): Filter by event status
- `featured` (optional): Filter featured events (true/false)
- `search` (optional): Search in title, description, type
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "events": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalEvents": 50,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### POST `/api/events`
Create a new event.

**Request Body:**
```json
{
  "title": "Tech Symposium 2024",
  "description": "Annual technical symposium",
  "date": "2024-03-15",
  "time": "09:00 AM",
  "location": "Main Auditorium",
  "type": "Conference",
  "category": "conference",
  "maxAttendees": 200,
  "organizer": "CSE Department",
  "contactEmail": "events@cse.edu",
  "requirements": "Open to all CSE students",
  "featured": true
}
```

#### GET `/api/events/[id]`
Get a specific event by ID.

#### PUT `/api/events/[id]`
Update an event by ID.

#### DELETE `/api/events/[id]`
Delete an event by ID.

### 3. Question Papers APIs

#### GET `/api/question-papers`
Get all question papers with optional filtering.

**Query Parameters:**
- `semester` (optional): Filter by semester
- `subject` (optional): Filter by subject
- `year` (optional): Filter by year
- `type` (optional): Filter by exam type
- `difficulty` (optional): Filter by difficulty
- `search` (optional): Search in title, subject, description
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "papers": [
    {
      "id": 1,
      "title": "Data Structures - Mid Term Exam",
      "subject": "Data Structures",
      "semester": 3,
      "year": "2024",
      "type": "Mid Term",
      "duration": "3 hours",
      "marks": "100",
      "difficulty": "Medium",
      "fileSize": "2.5 MB",
      "fileUrl": "/api/placeholder/400/600",
      "downloads": 245,
      "rating": 4.5,
      "uploadedDate": "2024-01-15",
      "uploadedBy": "Dr. Rajesh Kumar",
      "description": "Comprehensive mid-term examination...",
      "tags": ["arrays", "linked-lists", "stacks", "queues"]
    }
  ],
  "pagination": {...}
}
```

#### POST `/api/question-papers`
Upload a new question paper.

**Request Body:**
```json
{
  "title": "Data Structures - Final Exam",
  "subject": "Data Structures",
  "semester": 3,
  "year": "2024",
  "type": "Final Exam",
  "duration": "3 hours",
  "marks": "100",
  "difficulty": "Hard",
  "fileUrl": "/uploads/question-papers/file.pdf",
  "description": "Final examination covering all topics",
  "tags": ["final", "comprehensive"],
  "uploadedBy": "Dr. Rajesh Kumar"
}
```

### 4. Notes APIs

#### GET `/api/notes`
Get all notes with optional filtering.

**Query Parameters:**
- `semester` (optional): Filter by semester
- `subject` (optional): Filter by subject
- `year` (optional): Filter by year
- `type` (optional): Filter by note type
- `search` (optional): Search in title, subject, description
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "notes": [
    {
      "id": 1,
      "title": "Data Structures Complete Notes",
      "subject": "Data Structures",
      "semester": 3,
      "year": "2024",
      "type": "Complete Notes",
      "fileSize": "15.2 MB",
      "fileUrl": "/api/placeholder/400/600",
      "downloads": 456,
      "rating": 4.8,
      "uploadedDate": "2024-01-10",
      "uploadedBy": "Dr. Rajesh Kumar",
      "description": "Comprehensive notes covering all topics...",
      "chapters": ["Arrays", "Linked Lists", "Stacks & Queues", "Trees", "Graphs", "Hashing"],
      "tags": ["data-structures", "algorithms", "programming"]
    }
  ],
  "pagination": {...}
}
```

#### POST `/api/notes`
Upload new notes.

**Request Body:**
```json
{
  "title": "Machine Learning Notes",
  "subject": "Machine Learning",
  "semester": 5,
  "year": "2024",
  "type": "Complete Notes",
  "fileUrl": "/uploads/notes/ml-notes.pdf",
  "description": "Comprehensive ML notes with examples",
  "chapters": ["Linear Regression", "Logistic Regression", "Neural Networks"],
  "tags": ["machine-learning", "ai", "algorithms"],
  "uploadedBy": "Prof. Sunita Sharma"
}
```

### 5. Academic Calendar APIs

#### GET `/api/academic-calendar`
Get academic calendar events.

**Query Parameters:**
- `semester` (optional): Filter by semester
- `year` (optional): Filter by academic year
- `type` (optional): Filter by event type
- `month` (optional): Filter by month

**Response:**
```json
{
  "calendar": [
    {
      "id": 1,
      "semester": 1,
      "academicYear": "2024-25",
      "events": [
        {
          "id": 1,
          "title": "Semester Begins",
          "date": "2024-08-01",
          "type": "Academic",
          "description": "First semester classes begin",
          "isHoliday": false,
          "priority": "high"
        }
      ]
    }
  ],
  "totalEvents": 10
}
```

#### POST `/api/academic-calendar`
Add a new calendar event.

**Request Body:**
```json
{
  "semester": 1,
  "academicYear": "2024-25",
  "title": "Mid Term Exams",
  "date": "2024-09-15",
  "type": "Exam",
  "description": "Mid-term examinations for all subjects",
  "isHoliday": false,
  "priority": "high"
}
```

### 6. Clubs APIs

#### GET `/api/clubs`
Get all clubs and societies.

**Query Parameters:**
- `search` (optional): Search in name, description, activities
- `category` (optional): Filter by club category
- `isActive` (optional): Filter by active status
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "clubs": [
    {
      "id": 1,
      "name": "CodeCraft Club",
      "description": "Programming and software development enthusiasts",
      "logo": "/api/placeholder/100/100",
      "members": 150,
      "founded": "2018",
      "president": "John Doe",
      "vicePresident": "Jane Smith",
      "activities": ["Weekly coding sessions", "Hackathons", "Open source projects"],
      "color": "from-blue-500 to-cyan-500",
      "contactEmail": "codecraft@cse.edu",
      "socialLinks": {
        "github": "https://github.com/codecraft-club",
        "discord": "https://discord.gg/codecraft"
      }
    }
  ],
  "pagination": {...}
}
```

#### POST `/api/clubs`
Create a new club.

**Request Body:**
```json
{
  "name": "AI Research Club",
  "description": "Artificial Intelligence research and development",
  "president": "Alice Johnson",
  "vicePresident": "Bob Wilson",
  "activities": ["Research projects", "AI workshops", "Paper discussions"],
  "color": "from-purple-500 to-pink-500",
  "contactEmail": "ai-club@cse.edu",
  "socialLinks": {
    "github": "https://github.com/ai-club",
    "linkedin": "https://linkedin.com/company/ai-club"
  }
}
```

### 7. Announcements APIs

#### GET `/api/announcements`
Get all announcements.

**Query Parameters:**
- `type` (optional): Filter by announcement type
- `priority` (optional): Filter by priority level
- `targetAudience` (optional): Filter by target audience
- `search` (optional): Search in title, content, author
- `isActive` (optional): Filter by active status
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "announcements": [
    {
      "id": 1,
      "title": "Mid-Term Examination Schedule Released",
      "content": "The mid-term examination schedule...",
      "type": "Academic",
      "priority": "High",
      "targetAudience": "All Students",
      "author": "Dr. Rajesh Kumar",
      "authorRole": "Dean",
      "isActive": true,
      "startDate": "2024-03-01T00:00:00Z",
      "endDate": "2024-03-31T23:59:59Z",
      "attachments": [
        {
          "name": "Mid-Term Schedule.pdf",
          "url": "/api/placeholder/400/600",
          "size": "2.5 MB"
        }
      ]
    }
  ],
  "pagination": {...}
}
```

#### POST `/api/announcements`
Create a new announcement.

**Request Body:**
```json
{
  "title": "Library Hours Extended",
  "content": "The library will remain open until 10 PM...",
  "type": "General",
  "priority": "Medium",
  "targetAudience": "All Students",
  "author": "Library Administration",
  "authorRole": "Administration",
  "startDate": "2024-03-01T00:00:00Z",
  "endDate": "2024-04-30T23:59:59Z",
  "attachments": []
}
```

### 8. Students APIs

#### GET `/api/students`
Get all students.

**Query Parameters:**
- `semester` (optional): Filter by semester
- `batch` (optional): Filter by batch year
- `department` (optional): Filter by department
- `search` (optional): Search in name, student ID, email
- `isActive` (optional): Filter by active status
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "students": [
    {
      "id": 1,
      "studentId": "CSE2024001",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@student.edu",
      "phone": "+1234567890",
      "semester": 3,
      "year": 2024,
      "department": "CSE",
      "batch": "2022",
      "cgpa": 8.5,
      "attendance": 85,
      "address": "123 Main St, City, State",
      "dateOfBirth": "2000-05-15",
      "gender": "Male",
      "bloodGroup": "O+",
      "emergencyContact": {
        "name": "Jane Doe",
        "relationship": "Mother",
        "phone": "+1234567891"
      },
      "isActive": true,
      "enrolledDate": "2022-08-01"
    }
  ],
  "pagination": {...}
}
```

#### POST `/api/students`
Register a new student.

**Request Body:**
```json
{
  "studentId": "CSE2024005",
  "firstName": "Alice",
  "lastName": "Johnson",
  "email": "alice.johnson@student.edu",
  "phone": "+1234567899",
  "semester": 2,
  "year": 2024,
  "department": "CSE",
  "batch": "2023",
  "address": "456 Oak Ave, City, State",
  "dateOfBirth": "2001-08-20",
  "gender": "Female",
  "bloodGroup": "A+",
  "emergencyContact": {
    "name": "Robert Johnson",
    "relationship": "Father",
    "phone": "+1234567898"
  }
}
```

### 9. Faculty APIs

#### GET `/api/faculty`
Get all faculty members.

**Query Parameters:**
- `designation` (optional): Filter by designation
- `department` (optional): Filter by department
- `specialization` (optional): Filter by specialization
- `search` (optional): Search in name, employee ID, email
- `isActive` (optional): Filter by active status
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "faculty": [
    {
      "id": 1,
      "employeeId": "FAC001",
      "firstName": "Dr. Rajesh",
      "lastName": "Kumar",
      "email": "rajesh.kumar@faculty.edu",
      "phone": "+1234567801",
      "department": "CSE",
      "designation": "Professor",
      "specialization": "Machine Learning & AI",
      "qualifications": "Ph.D. in Computer Science, IIT Delhi",
      "experience": 20,
      "joiningDate": "2010-08-01",
      "subjects": ["Data Structures", "Machine Learning", "AI"],
      "researchAreas": ["Deep Learning", "Computer Vision", "NLP"],
      "publications": 25,
      "isActive": true
    }
  ],
  "pagination": {...}
}
```

#### POST `/api/faculty`
Add a new faculty member.

**Request Body:**
```json
{
  "employeeId": "FAC004",
  "firstName": "Dr. Sarah",
  "lastName": "Wilson",
  "email": "sarah.wilson@faculty.edu",
  "phone": "+1234567807",
  "department": "CSE",
  "designation": "Assistant Professor",
  "specialization": "Cybersecurity",
  "qualifications": "Ph.D. in Computer Science, Carnegie Mellon",
  "experience": 8,
  "address": "789 Security St, City, State",
  "dateOfBirth": "1988-12-05",
  "gender": "Female",
  "bloodGroup": "AB+",
  "subjects": ["Cybersecurity", "Network Security", "Cryptography"],
  "researchAreas": ["Network Security", "Cryptography", "Digital Forensics"]
}
```

### 10. Statistics APIs

#### GET `/api/statistics`
Get department statistics.

**Query Parameters:**
- `type` (optional): Get specific statistics type (students, faculty, academic, events, resources, clubs, achievements)

**Response:**
```json
{
  "statistics": {
    "students": {
      "total": 500,
      "active": 480,
      "graduated": 1200,
      "bySemester": {
        "1": 60,
        "2": 65,
        "3": 70,
        "4": 75,
        "5": 80,
        "6": 85,
        "7": 90,
        "8": 95
      },
      "byGender": {
        "male": 300,
        "female": 200
      },
      "averageCGPA": 8.2,
      "averageAttendance": 85
    },
    "faculty": {
      "total": 25,
      "active": 24,
      "byDesignation": {
        "Professor": 5,
        "Associate Professor": 8,
        "Assistant Professor": 10,
        "Lecturer": 2
      },
      "averageExperience": 15,
      "totalPublications": 150,
      "researchProjects": 25
    },
    "academic": {
      "totalSubjects": 50,
      "totalCourses": 8,
      "averageClassSize": 30,
      "passPercentage": 92,
      "placementRate": 95
    },
    "events": {
      "totalEvents": 45,
      "upcomingEvents": 12,
      "completedEvents": 33,
      "byType": {
        "Conference": 8,
        "Workshop": 15,
        "Competition": 10,
        "Cultural": 7,
        "Other": 5
      }
    },
    "resources": {
      "questionPapers": 120,
      "notes": 80,
      "books": 500,
      "journals": 150,
      "totalDownloads": 5000
    },
    "clubs": {
      "total": 6,
      "active": 6,
      "totalMembers": 560,
      "averageMembersPerClub": 93
    },
    "achievements": {
      "awards": 15,
      "publications": 150,
      "patents": 8,
      "researchGrants": 12
    }
  },
  "lastUpdated": "2024-01-15T10:00:00Z"
}
```

### 11. File Upload APIs

#### POST `/api/upload`
Upload files (question papers, notes, announcements, profile pictures).

**Request Body:**
- `file`: File to upload
- `type`: Type of file (question-paper, notes, announcement, profile)

**Response:**
```json
{
  "message": "File uploaded successfully",
  "file": {
    "name": "document.pdf",
    "size": 2048576,
    "type": "application/pdf",
    "url": "/uploads/question-papers/1640995200000_abc123.pdf",
    "uploadedAt": "2024-01-15T10:00:00Z"
  }
}
```

## Error Responses

All APIs return consistent error responses:

```json
{
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Authentication

Most endpoints require authentication. Include the session token in your requests:

```javascript
// Example with fetch
const response = await fetch('/api/events', {
  headers: {
    'Authorization': `Bearer ${sessionToken}`,
    'Content-Type': 'application/json'
  }
});
```

## Rate Limiting

APIs are rate-limited to prevent abuse:
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

## CORS

CORS is enabled for:
- `http://localhost:3000`
- `https://yourdomain.com`

## Testing

Use the provided demo credentials for testing:

**Students:**
- Email: `student@demo.com`
- Password: `password123`

**Faculty:**
- Email: `faculty@demo.com`
- Password: `password123`

**Admin:**
- Email: `admin@demo.com`
- Password: `password123`

## Support

For API support or questions, contact the development team at `dev@cse.edu`.
