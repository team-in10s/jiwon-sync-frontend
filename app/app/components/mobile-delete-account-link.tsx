'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MobileDeleteAccountLink() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isMobileOrTabletDevice =
      /android|iphone|iPhone|ipad|iPad|ipod|iPod|blackberry|iemobile|opera mini|tablet|kindle|silk/i.test(
        userAgent
      ) || navigator.maxTouchPoints > 1;

    setIsMobileOrTablet(isMobileOrTabletDevice);
  }, []);

  if (!isMobileOrTablet) {
    return null;
  }

  return (
    <Link href="/app/delete-account" className="text-gray-300 hover:text-white">
      회원 탈퇴
    </Link>
  );
}
