import { NextRequest, NextResponse } from 'next/server';
import { USER_COOKIE } from './app/lib/constants';

const protectedRoutes = ['/app/sync', '/app/resume', '/app/recruitment', '/app/onboarding'];
const authRoutes = ['/app/auth/signin', '/app/auth/signup'];

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get(USER_COOKIE);
  const path = request.nextUrl.pathname;

  // '/app'에 접근하면 '/app/onboarding'로 보내기
  if (path === '/app') {
    // return NextResponse.redirect(new URL('/app/sync', request.url));
    return NextResponse.redirect(new URL('/app/onboarding', request.url));
  }

  // 로그인을 하지 않은 유저가 로그인이 필요한 경로에 접근했으면
  // 로그인 화면으로 보내기
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  if (!userCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL('/app/auth/signin', request.url));
  }

  // 이미 로그인된 유저가 로그인, 회원가입 페이지 접근하면
  // resume 화면으로 보내기
  const isAuthRoute = authRoutes.some((route) => path === route);
  if (userCookie && isAuthRoute) {
    return NextResponse.redirect(new URL('/app/resume', request.url));
  }

  // 그 외 경로는 통과
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/app',
    '/app/sync/:path*',
    '/app/resume/:path*',
    '/app/recruitment/:path*',
    '/app/onboarding/:path*',
    '/app/auth/:path*',
  ],
};
