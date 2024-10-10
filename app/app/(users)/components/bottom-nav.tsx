'use client';

import Link from 'next/link';
import LogoutButton from '../../components/logout-button';
import LoginButton from '../../components/login-button';
import { isUserLoggedIn } from '@/app/lib/client-auth';
import { useState, useEffect } from 'react';
import { FileText, Briefcase, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

const links = [
  {
    name: '이력서 관리',
    href: '/app/resume',
  },
  { name: '스카우트 관리', href: '/app/recruitment' },
  { name: '커리어 계정 관리', href: '/app/account-status' },
];

type IconMappingKeys = '/app/resume' | '/app/recruitment' | '/app/account-status';

// Define the icon mapping
const iconMapping: Record<IconMappingKeys, JSX.Element> = {
  '/app/resume': <FileText />,
  '/app/recruitment': <Briefcase />,
  '/app/account-status': <User />,
};

export default function BottomNav() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnlyLogoutButton, setShowOnlyLogoutButton] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());

    const isOnboardingPage = pathname === '/app/onboarding';
    setShowOnlyLogoutButton(isOnboardingPage);

    const handleHashChange = () => {
      setShowOnlyLogoutButton(isOnboardingPage);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]);

  console.log('showOnlyLogoutButton? ', showOnlyLogoutButton);

  if (showOnlyLogoutButton) {
    return (
      <nav className="fixed inset-x-0 bottom-0 flex justify-center border-t border-gray-700 bg-secondary py-3 text-white shadow-md md:hidden">
        {isLoggedIn && <LogoutButton />}
      </nav>
    );
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 flex justify-around border-t border-gray-700 bg-secondary text-white shadow-md md:hidden">
      {isLoggedIn &&
        links.map((link) => {
          if (link.href.includes('app/recruitment')) {
            return (
              <a
                key={link.name}
                className="flex flex-col items-center justify-center gap-1 p-3"
                href="https://jiwon-sync-app.in10s.co/app?page=scout"
              >
                {iconMapping[link.href as IconMappingKeys]}
                <span className="text-xs sm:text-sm">{link.name}</span>
              </a>
            );
          }
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`${pathname === link.href && 'text-primary'} flex flex-col items-center justify-center gap-1 p-3`}
            >
              {iconMapping[link.href as IconMappingKeys]}
              <span className="text-xs sm:text-sm">{link.name}</span>
            </Link>
          );
        })}
      {isLoggedIn ? <LogoutButton /> : <LoginButton />}
    </nav>
  );
}
