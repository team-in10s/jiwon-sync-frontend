import { HrPlatformName } from '@/app/lib/constants';
import PlatformTerms from './platform-terms';
import { Dispatch, SetStateAction } from 'react';
import { createAccountWithEmailAction } from './actions';
import toast from 'react-hot-toast';

export default function EmailPlatform({
  currentPlatform,
  onNextPlatform,
  showLoadingIndicator,
}: {
  currentPlatform: HrPlatformName;
  onNextPlatform: () => void;
  showLoadingIndicator: Dispatch<SetStateAction<boolean>>;
}) {
  const handleConnectPlaformEmailAuth = async () => {
    showLoadingIndicator(true);

    try {
      await createAccountWithEmailAction(currentPlatform);

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

      <button
        className="mt-2 rounded-full border border-primary px-4 py-2 text-sm"
        onClick={handleConnectPlaformEmailAuth}
      >
        약관 동의 후 계정 생성하기
      </button>
    </div>
  );
}
