// app/lib/utils.ts

import { HrPlatformName } from './constants';

export function base64Encode(str: string): string {
  if (typeof window === 'undefined') {
    // Server-side
    return Buffer.from(str).toString('base64');
  } else {
    // Client-side
    return btoa(str);
  }
}

const COOKIE_SIZE_LIMIT = 4096; // 4KB in bytes

export function checkCookieSize(name: string, value: string): boolean {
  const fullCookie = `${name}=${value}`;
  const cookieSize = new Blob([fullCookie]).size;

  if (cookieSize > COOKIE_SIZE_LIMIT) {
    console.warn(
      `Cookie '${name}' size (${cookieSize} bytes) exceeds the recommended limit of ${COOKIE_SIZE_LIMIT} bytes.`
    );
    return false;
  }

  return true;
}

/* eslint-disable */
export function validateEmail(email: string) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validatePassword(password: string) {
  // 최소 8자, 최소 하나의 문자, 하나의 숫자, 하나의 특수문자
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return re.test(password);
}

export function validatePhoneNumber(phoneNumber: string) {
  const re = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
  return re.test(phoneNumber);
}

// 기본적인 URL 유효성 검사를 위한 정규 표현식
const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\p{L}\p{N}%\-._~]*)*\/?$/iu;

export const validateUrl = (url: string): string | null => {
  if (!url) {
    return null;
  }

  if (!URL_REGEX.test(url)) {
    return '유효한 URL을 입력해주세요.';
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'URL은 http:// 또는 https://로 시작해야 합니다.';
  }

  return null;
};
/* eslint-enable */

export const addHttpsProtocol = (url: string): string => {
  if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

export const getPlaceholderOriginLogin = (platform: HrPlatformName) => {
  // 리멤버, 점핏, 원티드 -> 이메일 계정을 입력하세요
  if (platform === 'remember' || platform === 'jumpit' || platform === 'wanted') {
    return '이메일 계정을 입력하세요.';
  }

  // 잡코리아, 사람인 -> 아이디를 입력하세요
  if (platform === 'jobkorea' || platform === 'saramin') {
    return '아이디를 입력하세요.';
  }

  // 인크루트 -> 아이디 또는 이메일 계정을 입력하세요
  return '아이디 또는 이메일 계정을 입력하세요.';
};

export const getPasswordGuide = (platform: HrPlatformName) => {
  // 원티드: 영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자 이하로 입력해주세요.
  // 사람인: 8~16자리 영문 대소문자, 숫자, 특수문자 중 3가지 이상 조합으로 만들어주세요.
  if (platform === 'wanted' || platform === 'saramin')
    return '8~16자리, 영문 대소문자, 숫자, 특수문자 중 3가지 이상 조합';

  // 리멤버: 영문/숫자/특수문자 중 2가지 이상 조합하여 8자 이상 입력해 주세요.
  if (platform === 'remember') return '8자리 이상, 영문/숫자/특수문자 중 2가지 이상 조합';

  // 점핏: 영문, 숫자, 특수문자를 포함하여 8~16자리를 입력해주세요.
  // 잡코리아: 8~16자의 영문, 숫자, 특수문자 조합으로 입력해 주세요.
  if (platform === 'jumpit' || platform === 'jobkorea')
    return '8~16자리, 영문, 숫자, 특수문자 조합';

  // 인크루트: 8~20자의 영문, 숫자, 특수문자를 조합하여 입력해주세요.
  return '8~20자리, 영문, 숫자, 특수문자를 조합';
};
