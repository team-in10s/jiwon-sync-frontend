// app/app/(users)/account-status/account-status-client.tsx

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getUserAuth } from '@/app/lib/client-auth';
import PlatformStatusItem from './platform-status-item';
import { PlatformStatusItem as PlatformStatusItemType } from './types';
import { HrPlatformName, PLATFORM_CONFIG } from '@/app/lib/constants';
import Modal from '../../components/modal';
import FullScreenLoadingIndicator from '../../components/fullscreen-loading-indicator';
import { EventSourcePolyfill, EventSourcePolyfillInit } from 'event-source-polyfill';
import EmailPlatformAccount from './email-platform-account';
import PhonePlatformAccount from './phone-platform-account';

export default function AccountStatusClient({
  initialStatus,
}: {
  initialStatus: PlatformStatusItemType[];
}) {
  const { credentials } = getUserAuth();
  const [platformStatus, setPlatformStatus] = useState<PlatformStatusItemType[]>(initialStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<HrPlatformName>('saramin');
  const [showsLoadingIndicator, setShowsLoadingIndicator] = useState(false);
  const eventSourceRef = useRef<{ [key: string]: EventSourcePolyfill | null }>({});
  const retryAttemptsRef = useRef<{ [key: string]: number }>({});
  const timeoutIdsRef = useRef<{ [key: string]: number }>({});

  const setupSSEConnection = useCallback(
    (platform: string) => {
      // If there's an existing connection for this platform, don't create a new one
      if (eventSourceRef.current[platform]) {
        console.log(`Connection for ${platform} already exists`);
        return;
      }

      // Clear any existing timeout for this platform
      if (timeoutIdsRef.current[platform]) {
        clearTimeout(timeoutIdsRef.current[platform]);
        delete timeoutIdsRef.current[platform];
      }

      const url = new URL(`/api/platform/${platform}/status`, window.location.origin);
      url.searchParams.append('t', Date.now().toString()); // Prevent caching

      console.log(`Setting up new connection for ${platform}`);

      const eventSourceInit: EventSourcePolyfillInit = {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
        // telling the EventSource to consider the connection inactive
        // if there's no activity for 25 seconds, and it will attempt to reconnect after this period.
        heartbeatTimeout: 25000, // 25 seconds in milliseconds
      };

      eventSourceRef.current[platform] = new EventSourcePolyfill(url.toString(), eventSourceInit);

      eventSourceRef.current[platform]!.onmessage = (event) => {
        // Reset retry attempts on successful message
        retryAttemptsRef.current[platform] = 0;

        // Clear any existing timeout for this platform
        if (timeoutIdsRef.current[platform]) {
          clearTimeout(timeoutIdsRef.current[platform]);
          delete timeoutIdsRef.current[platform];
        }

        const jsonString = event.data.replace(/'/g, '"');
        const data = JSON.parse(jsonString);
        console.log(`Received message for ${platform}:`, data);

        setPlatformStatus((prevStatus) =>
          prevStatus.map((p) => (p.platform === platform ? { ...p, status: data.status } : p))
        );

        if (data.status === 'completed' || data.status === 'failed') {
          console.log(`Closing connection for ${platform} due to status: ${data.status}`);
          eventSourceRef.current[platform]?.close();
          eventSourceRef.current[platform] = null;
        }
      };

      eventSourceRef.current[platform]!.onerror = (_) => {
        console.error(`SSE error for ${platform}:`);

        eventSourceRef.current[platform]?.close();
        eventSourceRef.current[platform] = null;

        // Increment retry attempts
        retryAttemptsRef.current[platform] = (retryAttemptsRef.current[platform] || 0) + 1;

        // Retry connection if less than 5 attempts
        if (retryAttemptsRef.current[platform] < 5) {
          console.log(
            `Retrying connection for ${platform}. Attempt: ${retryAttemptsRef.current[platform]}`
          );

          // Set a new timeout and store its ID
          timeoutIdsRef.current[platform] = window.setTimeout(() => {
            delete timeoutIdsRef.current[platform];
            setupSSEConnection(platform);
          }, 2000);
        } else {
          console.log(`Max retry attempts reached for ${platform}`);
          // Update status to 'failed' after max retries
          setPlatformStatus((prevStatus) =>
            prevStatus.map((p) => (p.platform === platform ? { ...p, status: 'failed' } : p))
          );
        }
      };

      eventSourceRef.current[platform]!.addEventListener('close', (_) => {
        console.log(`Server closed the connection for ${platform}`);
        eventSourceRef.current[platform]?.close();
        eventSourceRef.current[platform] = null;

        // Clear any existing timeout for this platform
        if (timeoutIdsRef.current[platform]) {
          clearTimeout(timeoutIdsRef.current[platform]);
          delete timeoutIdsRef.current[platform];
        }
      });
    },
    [credentials]
  );

  const stopSSEConnection = useCallback((platform: string) => {
    if (eventSourceRef.current[platform]) {
      console.log(`Manually stopping connection for ${platform}`);
      eventSourceRef.current[platform]?.close();
      eventSourceRef.current[platform] = null;
    }
  }, []);

  useEffect(() => {
    retryAttemptsRef.current = {}; // Reset retry attempts

    platformStatus.forEach((platformStat) => {
      const { platform, status } = platformStat;
      if (status && status !== 'completed' && status !== 'failed') {
        setupSSEConnection(platform);
      }
    });

    // Capture the current value of eventSourceRef
    const currentEventSources = eventSourceRef.current;

    return () => {
      Object.keys(currentEventSources).forEach((platform) => {
        if (currentEventSources[platform]) {
          console.log(`Cleaning up connection for ${platform}`);
          currentEventSources[platform]?.close();
          currentEventSources[platform] = null;
        }
      });

      // Clear all timeouts
      Object.values(timeoutIdsRef.current).forEach(clearTimeout);
      timeoutIdsRef.current = {};
    };
  }, [platformStatus, setupSSEConnection]);

  const handleConnectClick = (platform: HrPlatformName) => {
    setSelectedPlatform(platform);
    setIsModalOpen(true);
  };

  const handleConnectComplete = useCallback(
    (platform: HrPlatformName) => {
      closeModal();
      stopSSEConnection(platform);

      // Update the platformStatus state immediately
      setPlatformStatus((prevStatus) =>
        prevStatus.map((p) => (p.platform === platform ? { ...p, status: 'connecting' } : p))
      );

      setupSSEConnection(platform);
    },
    [setupSSEConnection, stopSSEConnection]
  );

  const closeModal = async () => {
    setIsModalOpen(false);

    // 모달이 닫힐때마다 해당 페이지 캐시 revalidate
    await revalidateCurrentPath();
  };

  const revalidateCurrentPath = async () => {
    console.log('revalidateCurrentPath');

    const { credentials } = getUserAuth();

    try {
      const response = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify({ path: '/app/account-status' }),
      });
      if (response.ok) {
        console.log('Path revalidated successfully');
      } else {
        console.error('Failed to revalidate path');
      }
    } catch (error) {
      console.error('Error revalidating path:', error);
    }
  };

  return (
    <>
      {platformStatus.map((p) => {
        const { status, platform } = p;
        return (
          <PlatformStatusItem
            key={platform}
            platform={platform}
            status={status}
            onConnectClick={() => handleConnectClick(platform)}
          />
        );
      })}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`${PLATFORM_CONFIG[selectedPlatform]?.displayName}에 계정을 생성합니다`}
        theme="dark"
      >
        {selectedPlatform === 'jumpit' || selectedPlatform === 'saramin' ? (
          <EmailPlatformAccount
            platform={selectedPlatform}
            showLoadingIndicator={setShowsLoadingIndicator}
            onConnectComplete={handleConnectComplete}
          />
        ) : (
          <PhonePlatformAccount
            platform={selectedPlatform}
            showLoadingIndicator={setShowsLoadingIndicator}
            onConnectComplete={handleConnectComplete}
          />
        )}
      </Modal>

      {showsLoadingIndicator && (
        <FullScreenLoadingIndicator message="길게는 1분 정도 소요될 수 있어요. 조금만 기다려주세요!" />
      )}
    </>
  );
}
