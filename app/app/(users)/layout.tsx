// app/app/(users)/layout.tsx

import { ReactNode } from 'react';
import NavLinks from './components/nav-links';
import MainLogoLink from '../components/main-logo-link';
import BottomNav from './components/bottom-nav';

// NOTE: user로서 사용할 수 있는 페이지들에 대한 레이아웃이라서 UserLayout이라고 이름 지음
export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="fixed z-30 w-full px-4 py-3 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between">
          <MainLogoLink />

          <NavLinks />
        </div>
      </header>

      <main className="min-h-screen px-6 py-20 text-black">{children}</main>

      <div className="md:hidden">
        <BottomNav />
      </div>
    </>
  );
}
