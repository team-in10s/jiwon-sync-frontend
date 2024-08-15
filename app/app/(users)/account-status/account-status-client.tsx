// app/app/(users)/account-status/account-status-client.tsx

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HrPlatformName, PLATFORM_CONFIG } from '@/app/lib/constants';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { getUserAuth } from '@/app/lib/auth';

type PlatformStatus = {
  platform: HrPlatformName;
  status: string;
};

export default function AccountStatusClient({
  initialStatus,
}: {
  initialStatus: PlatformStatus[];
}) {
  const { credentials } = getUserAuth();
  const [platformStatus, setPlatformStatus] = useState<PlatformStatus[]>(initialStatus);

  useEffect(() => {
    const controllers: AbortController[] = [];

    platformStatus.forEach((platformStat) => {
      const { platform } = platformStat;

      const controller = new AbortController();
      controllers.push(controller);

      // NOTE: next.config.mjs rewrite 설정값 참고
      // cors 에러 때문에 fetchEventSource에 아래처럼 url 작성하고
      // nextjs가 http://localhost:3000/api/some/path 로 보내지는 요청을
      // http://localhost:8000/api/some/path (로컬 기준)으로 전달
      fetchEventSource(`/api/platform/${platform}/status`, {
        method: 'GET',
        headers: {
          Accept: '*/*',
          Authorization: `Basic ${credentials}`,
        },
        signal: controller.signal,
        async onopen(response) {
          if (response.ok && response.headers.get('content-type') === 'text/event-stream') {
            return; // Everything's good
          } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
            console.error(`HTTP error ${response.status}`);
            // Throw an error to trigger onerror
            throw new Error(`HTTP error ${response.status}`);
          }
        },
        onmessage(ev) {
          console.log('ev ? ', ev); // {data: "{'status': 'failed'}", event: 'message', id: '', retry: undefined}

          const data = JSON.parse(ev.data);
          setPlatformStatus((prevStatus) =>
            prevStatus.map((p) => (p.platform === platform ? { ...p, status: data.status } : p))
          );

          if (data.status === 'completed' || data.status === 'failed') {
            controller.abort();
          }
        },
        onclose() {
          console.log(`Connection closed for ${platform}`);
        },
        onerror(err) {
          console.error(`SSE error for ${platform}:`, err);
          // You can implement a retry mechanism here if needed
          //   controller.abort();
        },
      });
    });

    return () => {
      controllers.forEach((controller) => controller.abort());
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
