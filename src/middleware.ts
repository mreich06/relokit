import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = withAuth(
  (req: NextRequest) => {
    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/login',
    },
  },
);

export const config = {
  matcher: ['/dashboard', '/profile', '/settings', '/(api|auth)/*'],
};
