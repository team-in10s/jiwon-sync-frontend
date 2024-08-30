// app/app/(users)/account-status/email-platform-account.tsx

import { connectPlatform, connectPlatformByDesktop } from '@/app/lib/api';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import PlatformConnectButton from '../onboarding/platform-connect-button';
import PlatformTerms from '../onboarding/platform-terms';

type Props = {
  platform: 'saramin' | 'jumpit';
  showLoadingIndicator: Dispatch<SetStateAction<boolean>>;
  onConnectComplete: (platform: 'saramin' | 'jumpit') => void;
};

export default function EmailPlatformAccount({
  platform,
  onConnectComplete,
  showLoadingIndicator,
}: Props) {
  const handleConnect = async () => {
    showLoadingIndicator(true);

    try {
      // ⭐️ TODO: 데스크탑 앱 출시되면 무조건 일렉트론 쪽으로 요청 보내기
      // (웹에서는 동기화 못함)
      // If it's a desktop app, execute the signup script
      if (typeof window !== 'undefined' && window.isDesktopApp) {
        console.log('🖥️ desktop app');
        await connectPlatformByDesktop(platform);
      } else {
        await connectPlatform(platform);
      }

      // 모달 닫고 sse 트리거
      onConnectComplete(platform);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'User is not authenticated') {
          console.error('User is not logged in');
          toast.error('유효하지 않은 유저입니다. 다시 로그인해 주세요.');
        } else {
          console.error('Failed to create account:', error.message);
          toast.error(`플랫폼에 계정 생성 중 오류가 발생했습니다. (${error.message})`);
        }
      }
    }

    showLoadingIndicator(false);
  };

  return (
    <>
      <PlatformTerms currentPlatform={platform} />
      <div className="flex items-center justify-center">
        <PlatformConnectButton onClickConnect={handleConnect} />
      </div>
    </>
  );
}
