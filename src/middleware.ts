import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname === '/login';

  // Redirect logged-in users away from the login page
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Redirect logged-out users trying to access protected routes
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
});

export const config = {
  // Protect everything except static assets, home page, and auth API routes
  matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*'],
};
