// app/app/(users)/onboarding/onboarding-step4.tsx

import { PLATFORM_CONFIG, HrPlatformName } from '@/app/lib/constants';
import { useState } from 'react';
import FullScreenLoadingIndicator from '../../components/fullscreen-loading-indicator';
import { createAccountWithEmailAction } from './actions';
import EmailPlatform from './email-platform';
import PhonePlatform from './phone-platform';

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
      const res = await createAccountWithEmailAction(currentPlatform);
      console.log('res! ', res); // 바로 리턴되는 response

      handleNextPlatform();
    } catch (error) {
      //
    }

    setShowsLoadingIndicator(false);
  };

  // const handleConnectPlaformPhoneAuth = async () => {
  //   setShowsLoadingIndicator(true);

  //   try {
  //     await requestPhoneAuthCode(currentPlatform);
  //   } catch (error) {
  //     //
  //   }

  //   setShowsLoadingIndicator(false);
  // };

  return (
    <>
      <div className="card w-full max-w-2xl p-8">
        <p className="mb-6 text-center text-2xl font-bold">
          채용 플랫폼에 계정을 순차적으로 만들고 있어요.
        </p>
        <p className="mb-10 text-center">필요한 약관 동의와, 전화번호 인증을 진행해주세요.</p>

        <div className="mb-8">
          <div className="mb-4 text-center text-xl font-bold">
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

        <div className="mt-4 text-center text-sm text-gray-500">
          {currentPlatformIndex + 1} / {sortedPlatforms.length}
        </div>

        <div className="flex justify-between">
          <button onClick={onPrevious} className="text-sm text-blue-600 hover:underline">
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
