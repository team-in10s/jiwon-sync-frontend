import ConnectedList from './connected-list';
import { PLATFORM_CONFIG, PlatformName } from '@/app/lib/constants';
import { PlatformConnectionStatus } from '../types';
import { getPlatformStatus } from '@/app/lib/server-actions';
import { Suspense } from 'react';

// const platforms = (Object.keys(PLATFORM_CONFIG) as PlatformName[])
//   .filter((platform) => platform !== 'custom' && platform !== 'jiwon')
//   .map((platform) => {
//     return {
//       platform,
//       displayName: PLATFORM_CONFIG[platform]?.displayName,
//       status: null,
//       imageSrc: PLATFORM_CONFIG[platform]?.logo
//         ? `/assets/platform_logo/${PLATFORM_CONFIG[platform].logo}`
//         : null,
//     };
//   });

const platforms = (Object.keys(PLATFORM_CONFIG) as PlatformName[])
  .filter((platform) => platform !== 'custom' && platform !== 'jiwon')
  .map((platform) => {
    return {
      platform,
      displayName: PLATFORM_CONFIG[platform]?.displayName,
      status: 'not_connected' as PlatformConnectionStatus,
      imageSrc: PLATFORM_CONFIG[platform]?.logo
        ? `/assets/platform_logo/${PLATFORM_CONFIG[platform].logo}`
        : null,
    };
  });

async function PlatformList() {
  try {
    const data: { platform: string; status: PlatformConnectionStatus }[] =
      await getPlatformStatus();

    const platformStatus = platforms.map((p) => {
      const m = data.find((d) => d.platform === p.platform);
      return {
        ...p,
        status: (m?.status || 'not_connected') as PlatformConnectionStatus,
      };
    });

    return <ConnectedList list={platformStatus} />;
  } catch (error) {
    console.error('Error fetching platform status:', error);
    return (
      <div>
        <h2 className="mb-4 text-xl font-bold">채용 플랫폼 연결 상태</h2>
        <div>
          에러가 발생했습니다.
          <a
            href="http://pf.kakao.com/_xjxkJbG/chat"
            target="_blank"
            className="text-gray-300 hover:text-white"
            rel="noreferrer"
          >
            지원전에 고객센터
          </a>
          로 문의해 주세요.
        </div>
      </div>
    );
  }
}

export default function PlatformConnection() {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">채용 플랫폼 연결 상태</h2>
      <Suspense fallback={<div>로딩 중...</div>}>
        <PlatformList />
      </Suspense>
    </div>
  );
}
