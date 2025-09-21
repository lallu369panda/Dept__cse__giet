import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
      studentId?: string
      department?: string
      semester?: string
      designation?: string
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string
    studentId?: string
    department?: string
    semester?: string
    designation?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
    studentId?: string
    department?: string
    semester?: string
    designation?: string
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Demo users for testing
        const demoUsers = [
          {
            id: '1',
            email: 'student@demo.com',
            password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
            name: 'John Student',
            role: 'student',
            studentId: 'CSE2024001',
            department: 'CSE',
            semester: '3'
          },
          {
            id: '2',
            email: 'faculty@demo.com',
            password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
            name: 'Dr. Jane Faculty',
            role: 'faculty',
            department: 'CSE',
            designation: 'Professor'
          }
        ]

        const user = demoUsers.find(u => u.email === credentials.email)
        
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            studentId: user.studentId,
            department: user.department,
            semester: user.semester,
            designation: user.designation
          }
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.studentId = user.studentId
        token.department = user.department
        token.semester = user.semester
        token.designation = user.designation
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role
        session.user.studentId = token.studentId
        session.user.department = token.department
        session.user.semester = token.semester
        session.user.designation = token.designation
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/login'
  },
  session: {
    strategy: 'jwt'
  }
})

export { handler as GET, handler as POST }
