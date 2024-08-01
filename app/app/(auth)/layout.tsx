import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <p>/auth layout</p>
      <div>{children}</div>
    </div>
  );
}
