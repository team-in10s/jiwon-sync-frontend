// app/app/(users)/account-status/account-status-client.tsx

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HrPlatformName, PLATFORM_CONFIG } from '@/app/lib/constants';

type PlatformStatus = {
  platform: HrPlatformName;
  status: string;
};

export default function AccountStatusClient({
  initialStatus,
}: {
  initialStatus: PlatformStatus[];
}) {
  const [platformStatus, setPlatformStatus] = useState<PlatformStatus[]>(initialStatus);

  // 수정 필요
  useEffect(() => {
    const eventSources: EventSource[] = [];

    platformStatus.forEach((platform) => {
      const eventSource = new EventSource(`/api/platform/${platform.platform}/status`, {
        withCredentials: true,
      });

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setPlatformStatus((prevStatus) =>
          prevStatus.map((p) =>
            p.platform === platform.platform ? { ...p, status: data.status } : p
          )
        );

        if (data.status === 'completed' || data.status === 'failed') {
          eventSource.close();
        }
      };

      eventSource.onerror = (error) => {
        console.error(`SSE error for ${platform.platform}:`, error);
        eventSource.close();
      };

      eventSources.push(eventSource);
    });

    return () => {
      eventSources.forEach((es) => es.close());
    };
  }, []);

  return (
    <>
      {platformStatus.map((p) => {
        const imgSrc = `/assets/platform_logo/${PLATFORM_CONFIG[p.platform]?.logo}`;
        const displayName = PLATFORM_CONFIG[p.platform]?.displayName;
        return (
          <div
            key={p.platform}
            className="my-4 flex items-center justify-between rounded-lg bg-gray-600 p-4"
          >
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
              <span>{displayName} </span>
            </div>
            <div>상태: {p.status}</div>
          </div>
        );
      })}
    </>
  );
}
