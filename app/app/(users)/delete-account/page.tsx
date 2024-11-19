'use client';

import { useEffect, useState } from 'react';
import { clearUserAuth, isUserLoggedIn } from '@/app/lib/client-auth';
import toast from 'react-hot-toast';
import { deleteAccountAction } from './actions';
import { useRouter } from 'next/navigation';

export default function DeleteAccountPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoggedIn()) {
      router.push('/app/auth/signin');
    }
  }, [router]);

  const handleDeleteAccount = async () => {
    setIsLoading(true); // Start loading
    const result = await deleteAccountAction();
    setIsLoading(false); // Stop loading

    if (result.success) {
      toast.success('계정이 삭제되었습니다.');
      clearUserAuth();
      router.push('/app/auth/signin');
    } else {
      toast.error(`계정 삭제 중 오류가 발생했습니다: ${result.error}`);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-gradient mb-8 text-3xl font-bold">계정 삭제</h1>
      <p>
        계정을 삭제하시겠습니까? 개정 내 모든 정보가 영구적으로 삭제되며, 이 작업은 되돌릴 수
        없습니다.
      </p>
      <button
        onClick={handleDeleteAccount}
        className={`btn-gradient mt-4 rounded-full px-4 py-2 text-white ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? '삭제 중...' : '계정 삭제'}
      </button>
    </div>
  );
}
