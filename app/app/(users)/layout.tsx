import Link from 'next/link';
import { ReactNode } from 'react';
import LogoutButton from '../components/logout-button';

// NOTE: user로서 사용할 수 있는 페이지들에 대한 레이아웃이라서 UserLayout이라고 이름 지음
export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Add any app-specific layout elements here */}
      <header>
        <div>지원 전에 sync 로고</div>
      </header>

      <nav>
        <Link href="/app/sync">대시보드(sync) | </Link>
        <Link href="/app/resume">이력서 관리 | </Link>
        <Link href="/app/recruitment">스카웃 제안 | </Link>
        <LogoutButton />
      </nav>

      <main>{children}</main>

      <footer>footer</footer>
    </div>
  );
}
