// app/app/(users)/onboarding/onboarding-step4.tsx

import { PLATFORM_CONFIG, HrPlatformName } from '@/app/lib/constants';
import { useState } from 'react';
import FullScreenLoadingIndicator from '../../components/fullscreen-loading-indicator';
import EmailPlatform from './email-platform';
import PhonePlatform from './phone-platform';
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

  // NOTE: 이메일로 가입하는 플랫폼 먼저 처리하기위해 배열 순서 sorting
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

  const currentPlatform = sortedPlatforms[currentPlatformIndex];
  // const isLastPlatform = currentPlatformIndex === sortedPlatforms.length - 1;

  const handleNextPlatform = () => {
    if (currentPlatformIndex === sortedPlatforms.length - 1) {
      onNext();
    } else {
      setCurrentPlatformIndex(currentPlatformIndex + 1);
    }
  };

  return (
    <>
      <div className="card w-full max-w-2xl p-6 md:p-8">
        {/* heading */}
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-xl font-semibold md:text-2xl">
            채용 플랫폼에 계정을 순차적으로 만들고 있어요.
          </h2>
          <PlatformProgressIndicator
            platforms={sortedPlatforms}
            currentPlatformIndex={currentPlatformIndex}
          />
          <p className="text-sm md:text-base lg:text-lg">
            필요한 약관 동의와, 전화번호 인증을 진행해주세요.
          </p>
        </div>

        {/* body content */}
        {/* <div className="mb-12"> */}
        {/* <div className="mb-6"> */}
        <div className="mb-4 text-center text-lg font-semibold md:text-xl">
          {PLATFORM_CONFIG[currentPlatform]?.displayName}에 계정을 생성합니다.
        </div>

        {PLATFORM_CONFIG[currentPlatform]?.authType === 'email' ? (
          <EmailPlatform
            showLoadingIndicator={setShowsLoadingIndicator}
            currentPlatform={currentPlatform}
            onNextPlatform={handleNextPlatform}
            onPrevious={onPrevious}
          />
        ) : (
          <PhonePlatform
            showLoadingIndicator={setShowsLoadingIndicator}
            currentPlatform={currentPlatform}
            onNextPlatform={handleNextPlatform}
            onPrevious={onPrevious}
          />
        )}
        {/* </div> */}
        {/* </div> */}

        {/* button */}
        {/* <div className="flex justify-between">
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
        </div> */}
      </div>
      {showsLoadingIndicator && (
        <FullScreenLoadingIndicator message="길게는 1분 정도 소요될 수 있어요. 조금만 기다려주세요!" />
      )}
    </>
  );
}
