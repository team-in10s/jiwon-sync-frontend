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
      className={`fixed inset-x-0 top-0 z-20 transition-colors duration-300 ${
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
                width={146}
                height={36}
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button
              // onClick={handleModalOpen} // Function to handle modal opening
              className="rounded-md bg-purple-00 px-3 py-2 text-sm font-medium text-white sm:bg-transparent sm:font-semibold sm:text-gray-02 sm:hover:text-gray-900"
            >
              다운로드
            </button>
            <Link
              href="/app/auth/signin"
              className="hidden rounded-md bg-purple-00 px-4 py-[0.63rem] text-sm font-semibold text-white sm:block"
            >
              이력서 관리 시작하기
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
