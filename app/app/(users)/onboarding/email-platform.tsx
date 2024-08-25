import { HrPlatformName } from '@/app/lib/constants';
import PlatformTerms from './platform-terms';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import PlatformConnectButton from './platform-connect-button';
import { connectPlatform } from '@/app/lib/api';

export default function EmailPlatform({
  currentPlatform,
  onNextPlatform,
  showLoadingIndicator,
  onPrevious,
}: {
  currentPlatform: HrPlatformName;
  onNextPlatform: () => void;
  showLoadingIndicator: Dispatch<SetStateAction<boolean>>;
  onPrevious: () => void;
}) {
  const handleConnectPlaformEmailAuth = async () => {
    showLoadingIndicator(true);

    try {
      console.log('1. 계정 생성 프로세스 시작');
      await connectPlatform(currentPlatform);

      onNextPlatform();
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
    <div>
      <PlatformTerms currentPlatform={currentPlatform} />

      <div className="mt-12 flex items-center justify-between">
        <button onClick={onPrevious} className="text-sm text-blue-500 hover:underline">
          이전 단계로
        </button>
        <PlatformConnectButton onClickConnect={handleConnectPlaformEmailAuth} />
      </div>
    </div>
  );
}
