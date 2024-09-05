// app/lib/utils.ts

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
