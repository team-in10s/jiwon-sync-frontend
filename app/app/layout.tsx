import { ReactNode } from 'react';

// '/app' 내 페이지에 보일 레이아웃이기에 AppLayout 이라고 이름 붙임
// '/'의 RootLayout과 혼동하지 말것
export default function AppLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
