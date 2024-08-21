// app/app/(users)/account-status/components/platform-status-item.tsx

import Image from 'next/image';
import { HrPlatformName, PLATFORM_CONFIG } from '@/app/lib/constants';
import StatusIndicator from './status-indicator';
import ConnectButton from './connect-button';

type PlatformStatusItemProps = {
  platform: HrPlatformName;
  status: string | null;
};

export default function PlatformStatusItem({ platform, status }: PlatformStatusItemProps) {
  const imgSrc = `/assets/platform_logo/${PLATFORM_CONFIG[platform]?.logo}`;
  const displayName = PLATFORM_CONFIG[platform]?.displayName;

  return (
    <div className="my-4 flex items-center justify-between rounded-lg bg-gray-600 p-4">
      <div className="flex items-center gap-2.5">
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={displayName || ''}
            width={24}
            height={24}
            className="rounded-md"
          />
        )}
        <span>{displayName}</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusIndicator status={status} />
        {status !== 'completed' && <ConnectButton />}
      </div>
    </div>
  );
}