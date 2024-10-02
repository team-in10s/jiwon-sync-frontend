// app/app/(users)/onboarding/onboarding-step3.tsx

import { useState } from 'react';
import { PLATFORM_CONFIG, HrPlatformName } from '@/app/lib/constants';
import CheckSVG from './check-svg';

type Step3Props = {
  onNext: (additionalPlatforms?: HrPlatformName[]) => void;
  additionalPlatforms: HrPlatformName[];
  loggedInPlatforms: HrPlatformName[];
};

export default function OnboardingStep3({
  onNext,
  additionalPlatforms,
  loggedInPlatforms,
}: Step3Props) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<HrPlatformName[]>(additionalPlatforms);

  // const allPlatforms = Object.keys(PLATFORM_CONFIG).filter(
  //   (key): key is HrPlatformName =>
  //     key !== 'jiwon' && key !== 'custom' && !loggedInPlatforms.includes(key as HrPlatformName)
  // );

  const allPlatforms = Object.keys(PLATFORM_CONFIG).filter(
    (key): key is HrPlatformName =>
      key !== 'jiwon' &&
      key !== 'custom' &&
      key !== 'jumpit' &&
      !loggedInPlatforms.includes(key as HrPlatformName)
  );

  const handleSelection = (platformId: HrPlatformName) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((p) => p !== platformId) : [...prev, platformId]
    );
  };

  return (
    <div className="card w-full max-w-2xl p-6 md:p-8">
      {/* heading */}
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-xl font-semibold md:text-2xl">
          추가로 가입할 채용 플랫폼을 선택해주세요.
        </h2>
        <p className="text-base md:text-lg">
          월 평균 4건 이상의 스카웃 제안을 받는 인재는 <br />
          3개 이상의 채용 플랫폼을 이용하고 있어요!
        </p>
      </div>

      {/* body content */}
      <div className="mb-12">
        <div className="mb-6">
          <p className="mb-2 text-sm text-gray-300">
            부계정을 생성할 플랫폼 : {selectedPlatforms.length}개
          </p>
          <div className="min-h-[50px] rounded-lg bg-gray-800 px-2 py-1 text-white">
            {selectedPlatforms.map((platformId) => (
              <div
                key={platformId}
                className="my-1 mr-2 inline-block rounded bg-gray-700 px-2 py-1 text-sm"
              >
                <span>
                  {PLATFORM_CONFIG[platformId as keyof typeof PLATFORM_CONFIG]?.displayName}
                </span>
                <button className="ml-2 text-red-500" onClick={() => handleSelection(platformId)}>
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 선택할 플랫폼이 남아 있을 때만 아래 보여줌 */}

        <div>
          <p className="mb-2 text-sm text-gray-300">사용하지 않던 플랫폼도 통합관리 해보세요!</p>
          <div className="mb-8 grid grid-cols-2 gap-4">
            {allPlatforms.map((platformId) => {
              const platform = PLATFORM_CONFIG[platformId];
              if (!platform) return null;

              const isSelected = selectedPlatforms.includes(platformId);

              return (
                <button
                  key={platformId}
                  onClick={() => handleSelection(platformId)}
                  className={`flex items-center justify-between rounded-lg p-4 text-left transition-colors ${
                    isSelected ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>{platform.displayName}</span>
                  {isSelected && <CheckSVG />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* button */}
      <div className="flex flex-col items-center justify-center gap-3">
        <button
          onClick={() => onNext(selectedPlatforms)}
          disabled={selectedPlatforms.length === 0}
          className="btn-gradient rounded-full px-10 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-50 md:px-16"
        >
          {selectedPlatforms.length}개 플랫폼에 새 계정 만들기
        </button>

        <button onClick={() => onNext()} className="text-sm text-gray-400 hover:underline">
          건너뛰기
        </button>
      </div>
    </div>
  );
}
