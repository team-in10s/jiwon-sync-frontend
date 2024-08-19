// app/app/components/login-button.tsx

'use client';

import Link from 'next/link';

export default function LoginButton() {
  return (
    <Link href="/app/auth/signin" className="btn-gradient rounded-full px-4 py-1.5 text-white">
      로그인
    </Link>
  );
}
