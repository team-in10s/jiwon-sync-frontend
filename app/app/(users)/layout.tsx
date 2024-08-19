// app/app/(users)/layout.tsx

import Link from 'next/link';
import { ReactNode } from 'react';
import Image from 'next/image';
import mainLogo from '../../main_logo.png';
import NavLinks from './components/nav-links';

// NOTE: user로서 사용할 수 있는 페이지들에 대한 레이아웃이라서 UserLayout이라고 이름 지음
export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="fixed z-50 w-full bg-secondary bg-opacity-40 px-4 py-3 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/app" className="flex gap-1.5">
            <div className="h-8 w-32">
              <Image src={mainLogo} alt="지원전에 Sync" unoptimized={true} />
            </div>
            <span className="text-gradient text-xl font-bold">Sync</span>
          </Link>

          <NavLinks />
        </div>
      </header>

      <main className="min-h-screen bg-secondary px-6 py-20 text-white">{children}</main>
    </>
  );
}
