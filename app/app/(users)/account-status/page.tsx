// app/app/(users)/account-status/page.tsx

import { Suspense } from 'react';
import { getPlatformStatusUseCase } from './use-cases';
import AccountStatusSkeleton from './account-status-skeleton';
import AccountStatusClient from './account-status-client';

export default function Index() {
  return (
    <div className="container mx-auto">
      <div className="w-full text-center">
        <h1 className="text-gradient mb-8 text-3xl font-bold">커리어 계정 관리</h1>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="mb-6 flex justify-between rounded-lg bg-gray-600 px-8 py-4">
            <p>
              커리어 전용 계정은 <span className="font-bold text-primary"> one-id</span>로 로그인
              가능해요!
            </p>
            <p>
              <a href="#" className="underline underline-offset-2">
                익스텐션 설치
              </a>
            </p>
          </div>

          <div className="card w-full max-w-2xl p-8">
            <h2 className="mb-4 text-xl font-semibold">채용 플랫폼 계정 생성 상태</h2>

            <Suspense fallback={<AccountStatusSkeleton />}>
              <AccountStatus />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

async function AccountStatus() {
  const initialAccountStatus = await getPlatformStatusUseCase();

  return <AccountStatusClient initialStatus={initialAccountStatus} />;
}
