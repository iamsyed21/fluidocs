import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// List of public routes that don't require authentication
const publicRoutes = ['/login', '/signup', "/"]
const authRoutes = ['/login', '/signup', "/"]
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const session = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })
    if (session && authRoutes.includes(path)) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    // If there's no session and the path is not public, redirect to login
    if (!session && !publicRoutes.includes(path)) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', encodeURI(request.url))
        return NextResponse.redirect(loginUrl)
    }

    // If there's a session or the path is public, continue
    return NextResponse.next()
}

// Add any routes that you want the middleware to run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

