import { NextRequest, NextResponse } from 'next/server';

const locales = ['en-US', 'nl-NL', 'nl'];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  return (
    request.cookies.get('NEXT_LOCALE')?.value || request.headers.get('Accept-Language') || 'en-US'
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
