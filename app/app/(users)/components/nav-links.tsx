'use client';

import Link from 'next/link';
import LogoutButton from '../../components/logout-button';
import { usePathname } from 'next/navigation';

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

  return (
    <nav className="hidden space-x-4 text-white md:flex">
      {links.map((link) => {
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
      <LogoutButton />
    </nav>
  );
}
