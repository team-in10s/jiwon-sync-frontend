// app/app/components/login-button.tsx

'use client';

import Link from 'next/link';

export default function LoginButton() {
  return (
    <>
      <Link
        href="/app/auth/signin"
        className="btn-gradient hidden rounded-full px-4 py-1.5 text-white md:block"
      >
        로그인
      </Link>

      <Link href="/app/auth/signin" className="py-4 md:hidden">
        로그인
      </Link>
    </>
  );
}
