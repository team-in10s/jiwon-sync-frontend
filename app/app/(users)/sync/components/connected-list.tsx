import Image from 'next/image';
import { PlatformName } from '@/app/lib/constants';
import { PlatformConnectionStatus } from '../types';
import PlatformConnectButton from './platform-connect-button';

type PropType = {
  list: {
    platform: PlatformName;
    displayName?: string;
    status: PlatformConnectionStatus;
    imageSrc: string | null;
  }[];
};

export default function ConnectedList({ list }: PropType) {
  console.log('ConnectedList (server component) rendered');

  return (
    <div>
      {list.map((statusList) => {
        const { platform, imageSrc, displayName, status } = statusList;
        return (
          <div
            className="mb-4 flex items-center justify-between rounded-lg bg-gray-600 p-4"
            key={platform}
          >
            <div className="flex items-center gap-2">
              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt={displayName || ''}
                  width={24}
                  height={24}
                  className="rounded-md"
                />
              )}
              <span>{displayName} </span>
            </div>

            <PlatformConnectButton status={status} platform={platform} />
          </div>
        );
      })}
    </div>
  );
}
