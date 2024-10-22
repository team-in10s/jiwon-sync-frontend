'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-10 transition-colors duration-300 ${
        isScrolled ? 'sm:bg-white/35' : 'sm:bg-transparent'
      } border-b border-gray-300 bg-white backdrop-blur-sm sm:border-none`}
    >
      <div className="mx-auto max-w-5xl px-8">
        <div className="flex h-16 justify-between">
          <div className="flex shrink-0 items-center">
            <Link href="/">
              <Image
                src="/assets/new-landing/jiwon-logo-new.png"
                alt="Logo"
                priority
                width={130}
                height={20}
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="rounded-md px-3 py-2 text-sm font-bold text-gray-02 hover:text-gray-900"
            >
              다운로드
            </Link>
            <Link
              href="/signin"
              className="rounded-md bg-purple-00 px-4 py-[0.63rem] text-sm font-semibold text-white"
            >
              이력서 관리 시작하기
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
