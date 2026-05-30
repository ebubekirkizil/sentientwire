import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

// Map ISO country codes to our supported locales
const countryToLocale: Record<string, string> = {
  // French speaking
  'FR': 'fr', 'MR': 'fr', 'BE': 'fr', 'CH': 'fr', 'LU': 'fr', 'SN': 'fr', 'CI': 'fr', 'CM': 'fr', 'CD': 'fr',
  // German speaking
  'DE': 'de', 'AT': 'de', 'LI': 'de',
  // Spanish speaking
  'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'PE': 'es', 'CL': 'es',
  // Italian
  'IT': 'it', 'SM': 'it',
  // Dutch
  'NL': 'nl', 'SR': 'nl',
  // Polish
  'PL': 'pl',
  // Russian speaking
  'RU': 'ru', 'BY': 'ru', 'KZ': 'ru', 'KG': 'ru',
  // Chinese speaking
  'CN': 'zh', 'TW': 'zh', 'HK': 'zh', 'SG': 'zh',
  // Turkish speaking
  'TR': 'tr', 'AZ': 'tr', 'CY': 'tr',
  // English dialects
  'US': 'en-US',
  'GB': 'en-GB',
  'CA': 'en-CA',
  'AU': 'en-GB', // Fallback to GB for Australia
  'NZ': 'en-GB',
};

export function proxy(request: NextRequest) {
  // Check if trying to access admin route
  if (request.nextUrl.pathname.match(/^\/[a-zA-Z-]+\/admin/)) {
    const authCookie = request.cookies.get('auth_token');
    if (!authCookie || authCookie.value !== 'admin_granted') {
      const match = request.nextUrl.pathname.match(/^\/([a-zA-Z-]+)\/admin/);
      const locale = match ? match[1] : 'tr';
      return NextResponse.redirect(new URL(`/${locale}?error=unauthorized`, request.url));
    }
  }

  // If the user visits the root page '/', we can intercept and use Vercel's IP geolocation
  if (request.nextUrl.pathname === '/') {
    // Has the user manually overridden the language? next-intl stores this in a cookie (NEXT_LOCALE)
    const hasLocaleCookie = request.cookies.has('NEXT_LOCALE');
    
    if (!hasLocaleCookie) {
      const country = request.headers.get('x-vercel-ip-country') || '';
      
      if (country) {
        const mappedLocale = countryToLocale[country.toUpperCase()];
        if (mappedLocale && routing.locales.includes(mappedLocale as any)) {
          // Redirect them to the mapped locale directly
          return NextResponse.redirect(new URL(`/${mappedLocale}`, request.url));
        } else {
          // If country not in map, default to global English (en-US)
          return NextResponse.redirect(new URL(`/en-US`, request.url));
        }
      }
    }
  }

  // Fallback to default next-intl middleware for all other requests
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for:
  // - api (API routes)
  // - _next (Next.js internals)
  // - any path containing a dot (static files like logo.png, favicon.ico, etc.)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
