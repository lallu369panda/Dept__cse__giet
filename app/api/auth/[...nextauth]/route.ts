import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

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
      linkedin?: string
      github?: string
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
    linkedin?: string
    github?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
    studentId?: string
    department?: string
    semester?: string
    linkedin?: string
    github?: string
  }
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text' }
      },
      async authorize(credentials) {
        console.log('🔐 Auth attempt:', { email: credentials?.email, role: credentials?.role })
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing credentials')
          return null
        }

        try {
          // First check database for registered users
          const dbUser = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase() }
          })

          if (dbUser && await bcrypt.compare(credentials.password, dbUser.password)) {
            console.log('✅ Database user login successful')
            return {
              id: dbUser.id,
              email: dbUser.email,
              name: `${dbUser.firstName} ${dbUser.lastName}`,
              role: dbUser.role,
              studentId: dbUser.studentId || undefined,
              department: dbUser.department,
              semester: dbUser.semester || undefined,
              linkedin: undefined,
              github: undefined
            }
          }

          // Fallback to demo users for testing
          const demoUsers = [
            {
              id: '1',
              email: 'student@demo.com',
              password: 'password123',
              name: 'John Student',
              role: 'student',
              studentId: 'CSE2024001',
              department: 'CSE',
              semester: '3'
            },
            {
              id: '2',
              email: 'admin@demo.com',
              password: 'admin123',
              name: 'Admin User',
              role: 'admin',
              department: 'CSE'
            }
          ]

          const demoUser = demoUsers.find(u => u.email.toLowerCase() === credentials.email.toLowerCase())
          
          if (demoUser && demoUser.password === credentials.password) {
            console.log('✅ Demo user login successful')
            return {
              id: demoUser.id,
              email: demoUser.email,
              name: demoUser.name,
              role: demoUser.role,
              studentId: demoUser.studentId || undefined,
              department: demoUser.department,
              semester: demoUser.semester || undefined,
              linkedin: demoUser.role === 'student' ? 'https://linkedin.com/in/demo-student' : undefined,
              github: demoUser.role === 'student' ? 'https://github.com/demo-student' : undefined
            }
          }

          console.log('❌ Authentication failed')
          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
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
        token.linkedin = user.linkedin
        token.github = user.github
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role
        session.user.studentId = token.studentId
        session.user.department = token.department
        session.user.semester = token.semester
        session.user.linkedin = token.linkedin
        session.user.github = token.github
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
