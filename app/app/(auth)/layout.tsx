import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:py-28">
      {children}
    </main>
  );
}
