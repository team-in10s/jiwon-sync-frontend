import { cookies } from 'next/headers';
import { CREDENTIALS_COOKIE, USER_COOKIE } from './constants';

export function getServerAuth() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get(USER_COOKIE);
  const credentials = cookieStore.get(CREDENTIALS_COOKIE);

  return {
    user: userCookie ? JSON.parse(userCookie.value) : null,
    credentials: credentials ? credentials.value : null,
  };
}
