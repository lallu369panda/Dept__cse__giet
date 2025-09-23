import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdmin = token?.role === 'admin'
    const isAdminPath = req.nextUrl.pathname.startsWith('/dashboard/admin')

    // Protect admin routes
    if (isAdminPath && !isAdmin) {
      return NextResponse.redirect(new URL('/dashboard/student', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ['/dashboard/admin/:path*']
}