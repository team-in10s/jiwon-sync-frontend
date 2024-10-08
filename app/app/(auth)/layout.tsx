import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary px-4 py-28 text-white">
      {children}
    </main>
  );
}
