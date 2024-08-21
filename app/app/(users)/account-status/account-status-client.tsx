// app/app/(users)/account-status/account-status-client.tsx

'use client';

import { useState, useEffect } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { getUserAuth } from '@/app/lib/client-auth';
import PlatformStatusItem from './platform-status-item';
import { PlatformStatusItem as PlatformStatusItemType } from './types';

export default function AccountStatusClient({
  initialStatus,
}: {
  initialStatus: PlatformStatusItemType[];
}) {
  const { credentials } = getUserAuth();
  const [platformStatus, setPlatformStatus] = useState<PlatformStatusItemType[]>(initialStatus);

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
          // Replace single quotes with double quotes
          const jsonString = ev.data.replace(/'/g, '"');
          const data = JSON.parse(jsonString);
          console.log('Parsed event data:', data);

          // console.log('data? ', data);
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
        const { status, platform } = p;
        return <PlatformStatusItem key={platform} platform={platform} status={status} />;
      })}
    </>
  );
}
