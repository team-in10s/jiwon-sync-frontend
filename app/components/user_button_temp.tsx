'use client';

import Link from 'next/link';

export default function UserBtnTemp() {
  return (
    <div className="flex items-center justify-center gap-4 sm:justify-normal">
      <Link
        href="/app/auth/signin"
        className="rounded-md bg-purple-00 px-4 py-[0.63rem] text-sm font-semibold text-white"
      >
        이력서 관리 시작하기
      </Link>
    </div>
  );
}
