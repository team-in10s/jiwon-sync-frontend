'use client'; // Error boundaries must be Client Components

import { startTransition, useEffect } from 'react';
import ProposalListClient from './proposal-list-client';
import { useRouter } from 'next/navigation';

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
    <>
      <div className="mb-2 flex flex-col items-center gap-2 text-context-error md:flex-row">
        <p>네트워크 통신 중 오류가 발생했습니다. 잠시 후에 다시 시도해 주세요.</p>
        <button
          className="rounded-lg bg-purple-02 px-2 py-1 text-sm text-gray-01"
          onClick={handleReset}
        >
          새로고침
        </button>
      </div>
      <ProposalListClient emails={[]} totalEmails={0} />
    </>
  );
}
