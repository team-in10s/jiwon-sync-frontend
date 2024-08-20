// app/app/(users)/components/nav-links.tsx

'use client';

import Link from 'next/link';
import LogoutButton from '../../components/logout-button';
import LoginButton from '../../components/login-button';
import { isUserLoggedIn } from '@/app/lib/client-auth';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const links = [
  {
    name: '이력서 관리',
    href: '/app/resume',
  },
  { name: '스카우트 관리', href: '/app/recruitment' },
  { name: '커리어 계정 관리', href: '/app/account-status' },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the current path is '/app/onboarding'
  const isOnboardingPage = pathname === '/app/onboarding';

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  // If it's the onboarding page, we only want to show the logout button
  if (isOnboardingPage) {
    return (
      <nav className="hidden space-x-4 text-white md:flex">
        <LogoutButton />
      </nav>
    );
  }

  return (
    <nav className="hidden space-x-4 text-white md:flex">
      {isLoggedIn &&
        links.map((link) => {
          if (link.href.includes('app/recruitment')) {
            return (
              <a key={link.name} href="https://jiwon-sync.in10s.co/app?page=scout">
                {link.name}
              </a>
            );
          }
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`${pathname === link.href && 'underline decoration-indigo-500 decoration-2 underline-offset-4'}`}
            >
              {link.name}
            </Link>
          );
        })}

      {isLoggedIn ? <LogoutButton /> : <LoginButton />}
    </nav>
  );
}
