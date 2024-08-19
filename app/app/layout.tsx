import type { Metadata } from 'next';
import { ReactNode } from 'react';
import AppFooter from './components/app-footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: '지원전에 Sync - 커리어에 경쟁력을 더하다',
  description: '커리어에 경쟁력을 더하다',
};

// '/app' 내 페이지에 보일 레이아웃이기에 AppLayout 이라고 이름 붙임
// '/'의 RootLayout과 혼동하지 말것
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <header>헤더가 필요없지만... AppLayout</header> */}
      <Toaster
        position="top-center"
        toastOptions={{
          error: {
            style: {
              background: '#ff6b6b',
              color: '#fff',
              fontWeight: 600,
            },
          },
          success: {
            style: {
              background: '#4BB543',
              color: '#fff',
              fontWeight: 600,
            },
          },
        }}
      />
      {children}
      <AppFooter />
    </>
  );
}
