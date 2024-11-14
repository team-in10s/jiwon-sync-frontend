'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UserBtnTemp({ center = false }: { center?: boolean }) {
  

  return (
    <div className={`flex items-center gap-4 ${center ? 'sm:justify-center' : ''}`}>
      <Link
        href="/app/auth/signin"
        className="hidden rounded-md bg-purple-00 px-4 py-[0.63rem] text-sm font-semibold text-white sm:block"
      >
        이력서 관리 시작하기
      </Link> 
    </div>   
  );
}
