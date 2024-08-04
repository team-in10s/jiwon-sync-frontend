import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col items-center justify-between bg-secondary px-4 py-28 text-white">
      {children}
      {/* class="flex-grow container mx-auto px-4 pt-20" */}
    </main>
  );
}
