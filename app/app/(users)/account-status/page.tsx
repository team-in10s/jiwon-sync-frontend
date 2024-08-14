import { Suspense } from 'react';
import { getPlatformStatusUseCase } from './use-cases';

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="mb-6">https://jiwon-sync.in10s.co/app/account-status</div>

      <Suspense fallback={<div>플랫폼 연결 상태 불러오는 중...</div>}>
        <PlatformStatusBox />
      </Suspense>
    </div>
  );
}

async function PlatformStatusBox() {
  const platformStatus = await getPlatformStatusUseCase();

  return (
    <div className="bg-slate-200 p-6">
      <div>PlatformStatusBox</div>

      {platformStatus.map((p) => {
        return (
          <div key={p.platform}>
            {p.platform} - 상태: {p.status}
          </div>
        );
      })}
    </div>
  );
}
