'use client'; // Error boundaries must be Client Components

import { startTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DetailButton from './detail-button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();

  const handleReset = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className="container mx-auto">
      <div className="w-full text-center">
        <h1 className="text-gradient mb-8 text-3xl font-bold">커리어 계정 관리</h1>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="mb-6 flex flex-col justify-between rounded-lg bg-purple-02 p-4 md:flex-row md:px-8">
            <p>
              커리어 전용 계정은 <span className="font-bold text-primary"> one-id</span>로 로그인
              가능해요!
            </p>

            <DetailButton />
          </div>

          <div className="mb-2 flex flex-col items-center gap-2 text-context-error md:flex-row">
            <p>네트워크 통신 중 오류가 발생했습니다. 잠시 후에 다시 시도해 주세요.</p>
            <button
              className="rounded-lg bg-purple-02 px-2 py-1 text-sm text-gray-01"
              onClick={handleReset}
            >
              새로고침
            </button>
          </div>

          <div className="card w-full max-w-2xl p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold">채용 플랫폼 계정 생성 상태</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
