// app/app/components/logout-button.tsx

'use client';

import { clearUserAuth } from '@/app/lib/client-auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    clearUserAuth();

    toast.success('로그아웃 되었습니다.');

    router.push('/app/auth/signin');
  };

  return (
    <button
      className="flex flex-col items-center justify-center gap-1 text-xs sm:text-sm md:text-base"
      onClick={handleLogout}
    >
      <div className="md:hidden">
        <LogOut />
      </div>
      <span>로그아웃</span>
    </button>
  );
}
