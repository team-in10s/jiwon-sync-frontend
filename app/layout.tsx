import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '지원전에 - 커리어에 경쟁력을 더하다',
  description: '지원전에 - 커리어에 경쟁력을 더하다',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
