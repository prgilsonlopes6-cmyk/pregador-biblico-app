import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const authCookie = request.cookies.get('app_auth');
  const isLoginPage = request.nextUrl.pathname.startsWith('/pregadorbiblico');

  if (!authCookie && !isLoginPage) {
    return NextResponse.redirect(new URL('/pregadorbiblico', request.url));
  }

  if (authCookie && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
