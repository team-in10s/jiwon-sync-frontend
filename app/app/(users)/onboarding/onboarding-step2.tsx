// app/app/(users)/onboarding/onboarding-step2.tsx

import { ChangeEvent, useState } from 'react';
import { PLATFORM_CONFIG, HrPlatformName } from '@/app/lib/constants';
import PlatformProgressIndicator from './platform-progress-indicator';
import FullScreenLoadingIndicator from '../../components/fullscreen-loading-indicator';
import toast from 'react-hot-toast';
// import { connectOrigin } from './actions';
import { connectOriginTest } from '@/app/lib/api';
import { getPlaceholderOriginLogin } from '@/app/lib/utils';

type Step2Props = {
  onNext: () => void;
  selectedPlatforms: HrPlatformName[];
  addAdditionalPlatforms: (platform: HrPlatformName) => void;
  addLoggedInPlatform: (platform: HrPlatformName) => void;
};

export default function OnboardingStep2({
  onNext,
  selectedPlatforms,
  addAdditionalPlatforms,
  addLoggedInPlatform,
}: Step2Props) {
  const [showsLoadingIndicator, setShowsLoadingIndicator] = useState(false);
  const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);
  const [originalId, setOriginalId] = useState('');
  const [originalPw, setOriginalPw] = useState('');

  const currentPlatformDisplay =
    PLATFORM_CONFIG[selectedPlatforms[currentPlatformIndex]]?.displayName;

  const handleOriginalId = (e: ChangeEvent<HTMLInputElement>) => {
    setOriginalId(e.target.value);
  };

  const handleOriginalPw = (e: ChangeEvent<HTMLInputElement>) => {
    setOriginalPw(e.target.value);
  };

  const handleOriginalLogin = async () => {
    setShowsLoadingIndicator(true);

    try {
      const currentPlatform = selectedPlatforms[currentPlatformIndex];
      await connectOriginTest(currentPlatform, originalId, originalPw);

      toast.success(`${currentPlatformDisplay} 로그인 성공!`);

      addLoggedInPlatform(currentPlatform);

      handleTryNext();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    setShowsLoadingIndicator(false);
  };

  const handleTryNext = () => {
    const isLastPlatform = selectedPlatforms.length - 1 === currentPlatformIndex;

    // 이게 마지막 플랫폼이면 다음 스텝으로
    if (isLastPlatform) {
      // next step
      onNext();
    } else {
      // 아니면 다음 플랫폼
      // next platform to login original
      setCurrentPlatformIndex((prev) => {
        return prev + 1;
      });
    }

    // input reset
    resetInputs();
  };

  const resetInputs = () => {
    setOriginalId('');
    setOriginalPw('');
  };

  const idPlaceholder = getPlaceholderOriginLogin(selectedPlatforms[currentPlatformIndex]);

  const isSubmitDisabled = !originalId.trim() || !originalPw;

  return (
    <>
      <div className="card w-full max-w-2xl p-8">
        {/* heading */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">채용 플랫폼 계정을 연결합니다.</h2>
          <PlatformProgressIndicator
            platforms={selectedPlatforms}
            currentPlatformIndex={currentPlatformIndex}
          />
        </div>

        {/* body content */}
        <div className="mb-5 rounded-lg border border-gray-400/20 p-5">
          <div className="mb-4 text-center text-lg font-semibold md:text-xl">
            {currentPlatformDisplay}에 로그인합니다.
          </div>

          <div className="mb-2 flex flex-col space-y-2 sm:min-w-64 md:min-w-96">
            <input
              id="original-id"
              type="text"
              value={originalId}
              onChange={handleOriginalId}
              required
              placeholder={idPlaceholder}
              className="rounded-md border border-gray-500 bg-gray-700 p-2 text-white"
            />
          </div>
          <div className="mb-2 flex flex-col space-y-2">
            <input
              id="original-pw"
              type="password"
              required
              value={originalPw}
              onChange={handleOriginalPw}
              placeholder="비밀번호를 입력하세요."
              className="rounded-md border border-gray-500 bg-gray-700 p-2 text-white"
            />
          </div>

          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={handleOriginalLogin}
              disabled={isSubmitDisabled}
              className="btn-gradient w-full rounded-full py-2 font-semibold disabled:opacity-50"
            >
              로그인
            </button>
            <button onClick={handleTryNext} className="text-sm text-gray-400 underline">
              다음에 하기
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            className="btn-elevate mt-2 rounded-full border border-primary/60 px-4 py-2 text-sm"
            onClick={() => {
              const currentPlatform = selectedPlatforms[currentPlatformIndex];
              addAdditionalPlatforms(currentPlatform);

              handleTryNext();
            }}
          >
            3초 만에 부계정 생성
          </button>
        </div>
      </div>

      {showsLoadingIndicator && (
        <FullScreenLoadingIndicator message="길게는 1분 정도 소요될 수 있어요. 조금만 기다려주세요!" />
      )}
    </>
  );
}
