// TODO: server action 으로 개선하기.
// TODO: 서버에서 cookie 사용 참고: https://nextjs.org/docs/app/api-reference/functions/cookies
import { getPlatformStatus } from '@/app/lib/server-actions';
import ConnectedList from './connected-list';
import { PLATFORM_CONFIG } from '@/app/lib/constants';

// TODO: constant로 옮길 수 있을듯?
// platform과 status를 내려준다

const platforms = Object.keys(PLATFORM_CONFIG).map((platform) => {
  return {
    platform,
    displayName: PLATFORM_CONFIG[platform].displayName,
    status: null,
  };
});

// TODO: error boundary, suspense
export default async function PlatformConnection() {
  console.log('PlatformConnection rendered');

  // [ { platform: 'aaa', status: 'completed' } ]
  const data: { platform: string; status: 'complete' }[] = await getPlatformStatus();

  const platformStatus = platforms.map((p) => {
    const m = data.find((d) => d.platform === p.platform);
    if (m) {
      return { ...p, status: m.status };
    }
    return p;
  });

  return (
    <div>
      <ConnectedList list={platformStatus} />
    </div>
  );
}
