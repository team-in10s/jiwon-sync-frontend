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

  // const handleDownloadClick = () => {
  //   const userAgent = navigator.userAgent.toLowerCase();
  //   const isAndroid = /android/.test(userAgent);
  //   const isIOS = /iphone|ipad|ipod/.test(userAgent);
  //   const isMobile = /iphone|ipod|android|blackberry|opera mini|iemobile|wpdesktop/.test(userAgent);
  //   const isTablet = /ipad|tablet|kindle|playbook/.test(userAgent);

  //   if (isIOS) {
  //     // Redirect to Apple App Store
  //     window.location.href = 'https://apps.apple.com';
  //   } else if (isAndroid) {
  //     // Redirect to Google Play Store
  //     window.location.href = 'https://play.google.com/store';
  //   } else if (isMobile || isTablet) {
  //     // If it's a mobile or tablet but not specifically identified as iOS or Android
  //     console.log('Mobile or Tablet device detected');
  //   } else {
  //     // Log "pc" to the console for desktop users
  //     console.log('pc');
  //   }
  // };

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
            {/* <button
              onClick={handleDownloadClick}
              className="rounded-md bg-purple-00 px-3 py-2 text-sm font-medium text-white sm:bg-transparent sm:font-semibold sm:text-gray-02 sm:hover:text-gray-900"
            >
              다운로드
            </button> */}
            <Link
              href="/app/auth/signin"
              className="rounded-md bg-purple-00 px-2 py-[0.63rem] text-xs font-medium text-white sm:px-4 sm:text-sm sm:font-semibold"
            >
              이력서 관리 시작하기
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
