import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Check if trying to access admin route
  if (request.nextUrl.pathname.match(/^\/[a-z]{2}\/admin/)) {
    // We can add auth bypass for dev or specific tokens here if needed
    // For now, keeping the original logic from proxy.ts
    const authCookie = request.cookies.get('auth_token');
    
    // Note: If you want to bypass this for local development, you could check an env var
    if (!authCookie || authCookie.value !== 'admin_granted') {
      const match = request.nextUrl.pathname.match(/^\/([a-z]{2})\/admin/);
      const locale = match ? match[1] : 'tr';
      return NextResponse.redirect(new URL(`/${locale}?error=unauthorized`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for:
  // - api (API routes)
  // - _next (Next.js internals)
  // - any path containing a dot (static files like logo.png, favicon.ico, etc.)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
