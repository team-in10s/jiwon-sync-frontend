// middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { USER_COOKIE } from './app/lib/constants';
import { checkAndRedirectPlatformStatus } from './app/app/(users)/onboarding/use-cases';

const protectedRoutes = [
  '/app/sync',
  '/app/resume',
  '/app/recruitment',
  '/app/onboarding',
  '/app/account-status',
];
const authRoutes = ['/app/auth/signin', '/app/auth/signup'];

export async function middleware(request: NextRequest) {
  const userCookie = request.cookies.get(USER_COOKIE);
  const path = request.nextUrl.pathname;

  // '/app'에 접근하면 '/app/resume'로 보내기
  if (path === '/app') {
    // return NextResponse.redirect(new URL('/app/sync', request.url));
    return NextResponse.redirect(new URL('/app/resume', request.url));
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

  // 임시 처리
  if (path === '/app/resume') {
    return NextResponse.next();
  }

  // '/app/onboarding' 에 접근했을때 플랫폼 동기화 이력 확인 후
  // Check platform status for all protected routes
  if (protectedRoutes.some((route) => path.startsWith(route))) {
    try {
      const result = await checkAndRedirectPlatformStatus(path);
      if (result && result.shouldRedirect) {
        return NextResponse.redirect(new URL(result.destination, request.url));
      }
    } catch (error) {
      console.error('Error in middleware:', error);
    }
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
    '/app/account-status/:path*',
  ],
};
