'use client';
import { useRouter } from 'next/navigation';
import { clearUserAuth } from '@/app/lib/auth';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    clearUserAuth();

    // TODO: 로그아웃 되었습니다 토스트

    router.push('/app/auth/signin');
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}
