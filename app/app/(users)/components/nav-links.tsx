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
  { name: '스카우트 관리', href: '/app/recruitment?page=1' },
  { name: '커리어 계정 관리', href: '/app/account-status' },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnlyLogoutButton, setShowOnlyLogoutButton] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());

    // Check if the current path is '/app/onboarding'
    const isOnboardingPage = pathname === '/app/onboarding';

    // Check if the current path is '/app/faq' and has '#q2' in the URL
    const isFaqQ2Page = pathname === '/app/faq' && window.location.hash === '#q2';

    // Combine the conditions
    setShowOnlyLogoutButton(isOnboardingPage || isFaqQ2Page);
    // Add event listener for hash changes
    const handleHashChange = () => {
      const newIsFaqQ2Page = pathname === '/app/faq' && window.location.hash === '#q2';
      setShowOnlyLogoutButton(isOnboardingPage || newIsFaqQ2Page);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]);

  // If it's the onboarding page or FAQ#q2 page,
  // show the logout button
  if (showOnlyLogoutButton) {
    return (
      <nav className="hidden space-x-4 text-white md:flex">
        <LogoutButton />
      </nav>
    );
  }

  return (
    <nav className="hidden space-x-4 text-black md:flex">
      {isLoggedIn &&
        links.map((link) => {
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
