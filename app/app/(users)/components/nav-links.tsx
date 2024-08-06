'use client';

import Link from 'next/link';
import LogoutButton from '../../components/logout-button';
import { usePathname } from 'next/navigation';

const links = [
  { name: '연결하기', href: '/app/sync' },
  {
    name: '이력서 관리',
    href: '/app/resume',
  },
  { name: '스카우트 제안', href: '/app/recruitment' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden space-x-4 md:flex">
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
