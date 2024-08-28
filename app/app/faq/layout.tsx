// app/app/faq/layout.tsx

import { ReactNode } from 'react';
import NavLinks from '../(users)/components/nav-links';
import MainLogoLink from '../components/main-logo-link';

export default function FaqLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="fixed z-50 w-full bg-secondary bg-opacity-40 px-4 py-3 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between">
          <MainLogoLink />

          <NavLinks />
        </div>
      </header>

      <main className="min-h-screen bg-secondary px-6 py-20 text-white">{children}</main>
    </>
  );
}
