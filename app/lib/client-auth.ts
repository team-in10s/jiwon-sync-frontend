// app/lib/client-auth.ts

import Cookies from 'js-cookie';
import { CREDENTIALS_COOKIE, USER_COOKIE } from './constants';
import { checkCookieSize } from './utils';

const COOKIE_OPTIONS = {
  // ensuring the cookie is only sent over HTTPS connections
  // This ensures that cookies can be set in non-HTTPS environments during development.
  secure: true,
  domain: process.env.NODE_ENV === 'production' ? '.in10s.co' : undefined,
  sameSite: 'None' as const, // to allow the cookie to be sent in some cross-site scenarios while still providing some CSRF protection.
  path: '/',
};

type User = {
  call_no: string;
  email: string;
};

export function setUserAuth(user: User, credentials: string) {
  const userJson = JSON.stringify(user);

  if (checkCookieSize(USER_COOKIE, userJson) && checkCookieSize(CREDENTIALS_COOKIE, credentials)) {
    Cookies.set(USER_COOKIE, JSON.stringify(user), COOKIE_OPTIONS);
    Cookies.set(CREDENTIALS_COOKIE, credentials, COOKIE_OPTIONS);
  } else {
    throw new Error('User auth data exceeds cookie size limit');
  }
}

export function clearUserAuth() {
  Cookies.remove(USER_COOKIE, COOKIE_OPTIONS);
  Cookies.remove(CREDENTIALS_COOKIE, COOKIE_OPTIONS);
}

type userInfo = {
  telNo: string;
  email: string;
};

export function getUserAuth(): {
  user: userInfo | null;
  credentials: string | null;
} {
  const userCookie = Cookies.get(USER_COOKIE);
  const credentials = Cookies.get(CREDENTIALS_COOKIE);
  const parsedUser = userCookie ? JSON.parse(userCookie) : null;

  return {
    user: parsedUser
      ? {
          telNo: parsedUser['call_no'],
          email: parsedUser['email'],
        }
      : null,
    credentials: credentials || null,
  };
}

export function isUserLoggedIn(): boolean {
  const { user } = getUserAuth();
  return !!user;
}

// 이전 로컬 스토리지 방식

// export function isUserLoggedIn() {
//   return localStorage.getItem('user') ? true : false;
// }

// export function getUserCredential() {
//   return localStorage.getItem('user_credentials');
// }

// TODO: user 타입
// export function getCurrentUser() {
//   const userStr = localStorage.getItem('user');

//   return userStr ? JSON.parse(userStr) : null;
// }
