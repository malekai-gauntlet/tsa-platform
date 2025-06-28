import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = ['/map', '/login'];

// Paths that start with these prefixes are also public
const publicPathPrefixes = ['/onboarding', '/api'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes and paths starting with public prefixes
  if (
    publicRoutes.includes(pathname) ||
    publicPathPrefixes.some(prefix => pathname.startsWith(prefix))
  ) {
    return NextResponse.next();
  }

  // For protected routes, let the client-side auth handle it
  // This middleware serves as a backup/audit layer
  // The actual authentication is still handled by Amplify

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
