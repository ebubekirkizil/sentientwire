import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if trying to access admin route
  if (request.nextUrl.pathname.includes('/admin')) {
    const authCookie = request.cookies.get('auth_token');
    
    if (!authCookie || authCookie.value !== 'admin_granted') {
      // Extract locale if possible, default to en
      const match = request.nextUrl.pathname.match(/^\/([a-z]{2})\/admin/);
      const locale = match ? match[1] : 'en';
      
      // Redirect to home page
      return NextResponse.redirect(new URL(`/${locale}?error=unauthorized`, request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
