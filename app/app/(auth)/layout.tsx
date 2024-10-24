import { ReactNode } from 'react';
import AuthNavbar from './auth/components/auth-navbar';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <AuthNavbar />
      {children}
    </div>
  );
}
