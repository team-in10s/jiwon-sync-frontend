import Cookies from 'js-cookie';
import { CREDENTIALS_COOKIE, USER_COOKIE } from './constants';
import { checkCookieSize } from './utils';

// Cookie options
const COOKIE_OPTIONS = {
  // expires: 7, // 7 days
  secure: process.env.NODE_ENV === 'production', // ensuring the cookie is only sent over HTTPS connections
  sameSite: 'strict' as const,
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
  Cookies.remove(USER_COOKIE);
  Cookies.remove(CREDENTIALS_COOKIE);
}

export function getUserAuth() {
  const userCookie = Cookies.get(USER_COOKIE);
  const credentials = Cookies.get(CREDENTIALS_COOKIE);

  return {
    user: userCookie ? JSON.parse(userCookie) : null,
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