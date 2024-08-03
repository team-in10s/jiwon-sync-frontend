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
