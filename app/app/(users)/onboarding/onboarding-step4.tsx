// app/app/(users)/onboarding/onboarding-step4.tsx

import { PLATFORM_CONFIG, HrPlatformName } from '@/app/lib/constants';
import { useState } from 'react';
import FullScreenLoadingIndicator from '../../components/fullscreen-loading-indicator';
import { createAccountWithEmailAction } from './actions';
import EmailPlatform from './email-platform';
import PhonePlatform from './phone-platform';
import toast from 'react-hot-toast';
import PlatformProgressIndicator from './platform-progress-indicator';

type Step4Props = {
  selectedPlatforms: HrPlatformName[];
  onNext: () => void;
  onPrevious: () => void;
};

export default function OnboardingStep4({ selectedPlatforms, onNext, onPrevious }: Step4Props) {
  const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);
  const [showsLoadingIndicator, setShowsLoadingIndicator] = useState(false);

  // 임시 주석 처리
  // const [completedPlatforms, setCompletedPlatforms] = useState<string[]>([]);
  // const handlePlatformCompletion = (platformId: string) => {
  //   setCompletedPlatforms((prev) =>
  //     prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId]
  //   );
  // };
  const sortedPlatforms = [...selectedPlatforms].sort((a, b) => {
    if (PLATFORM_CONFIG[a]?.authType === 'email' && PLATFORM_CONFIG[b]?.authType !== 'email') {
      return -1; // a comes before b
    } else if (
      PLATFORM_CONFIG[a]?.authType !== 'email' &&
      PLATFORM_CONFIG[b]?.authType === 'email'
    ) {
      return 1; // b comes before a
    }
    return 0; // no change in order
  });

  console.log('sortedPlatforms: ', sortedPlatforms);

  const currentPlatform = sortedPlatforms[currentPlatformIndex];
  const isLastPlatform = currentPlatformIndex === sortedPlatforms.length - 1;

  const handleNextPlatform = () => {
    if (isLastPlatform) {
      onNext();
    } else {
      setCurrentPlatformIndex(currentPlatformIndex + 1);
    }
  };

  const handleConnectPlaformEmailAuth = async () => {
    setShowsLoadingIndicator(true);

    try {
      await createAccountWithEmailAction(currentPlatform);

      handleNextPlatform();
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

    setShowsLoadingIndicator(false);
  };

  return (
    <>
      <div className="card w-full max-w-2xl p-8">
        {/* heading */}
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-2xl font-semibold">
            채용 플랫폼에 계정을 순차적으로 만들고 있어요.
          </h2>
          <PlatformProgressIndicator
            platforms={sortedPlatforms}
            currentPlatformIndex={currentPlatformIndex}
          />
          <p className="text-lg">필요한 약관 동의와, 전화번호 인증을 진행해주세요.</p>
        </div>

        {/* body content */}
        <div className="mb-12">
          <div className="mb-6">
            <div className="mb-4 text-center text-xl font-semibold">
              {PLATFORM_CONFIG[currentPlatform]?.displayName}에 계정을 생성합니다.
            </div>

            {PLATFORM_CONFIG[currentPlatform]?.authType === 'email' ? (
              <EmailPlatform
                currentPlatform={currentPlatform}
                onConnect={handleConnectPlaformEmailAuth}
              />
            ) : (
              <PhonePlatform
                showLoadingIndicator={setShowsLoadingIndicator}
                currentPlatform={currentPlatform}
                onNextPlatform={handleNextPlatform}
              />
            )}
          </div>
        </div>

        {/* button */}
        <div className="flex justify-between">
          <button onClick={onPrevious} className="text-sm text-blue-500 hover:underline">
            이전 단계로
          </button>
          <button
            onClick={onNext}
            //   disabled={completedPlatforms.length !== selectedPlatforms.length} // 임시 주석처리

            className="btn-gradient rounded-full px-16 py-3 font-semibold disabled:opacity-50"
          >
            다음
          </button>
        </div>
      </div>
      {showsLoadingIndicator && <FullScreenLoadingIndicator />}
    </>
  );
}
