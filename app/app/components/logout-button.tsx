'use client';

import { clearUserAuth } from '@/app/lib/client-auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    clearUserAuth();

    toast.success('로그아웃 되었습니다.');

    router.push('/app/auth/signin');
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}
