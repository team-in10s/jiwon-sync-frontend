// app/app/(users)/onboarding/onboarding-step3.tsx

import { useState } from 'react';
import { PLATFORM_CONFIG, HrPlatformName } from '@/app/lib/constants';
import CheckSVG from './check-svg';

type Step3Props = {
  onNext: (additionalPlatforms: HrPlatformName[]) => void;
  onPrevious: () => void;
  selectedPlatforms: HrPlatformName[];
};

export default function OnboardingStep3({ onNext, onPrevious, selectedPlatforms }: Step3Props) {
  const [additionalPlatforms, setAdditionalPlatforms] = useState<HrPlatformName[]>([]);

  const availablePlatforms = Object.keys(PLATFORM_CONFIG).filter(
    (key): key is HrPlatformName =>
      key !== 'jiwon' && key !== 'custom' && !selectedPlatforms.includes(key as HrPlatformName)
  );

  const handleSelection = (platformId: HrPlatformName) => {
    setAdditionalPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((p) => p !== platformId) : [...prev, platformId]
    );
  };

  const totalPlatformNum = selectedPlatforms.length + additionalPlatforms.length;

  return (
    <div className="card w-full max-w-2xl p-6 md:p-8">
      {/* heading */}
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-xl font-semibold md:text-2xl">
          추가로 사용할 채용 플랫폼을 선택해주세요.
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
            기존 사용하던 채용 플랫폼 : {selectedPlatforms.length}개
          </p>
          <div className="rounded-lg bg-gray-800 px-2 py-1 text-white">
            {selectedPlatforms.map((platformId) => (
              <span
                key={platformId}
                className="my-1 mr-2 inline-block rounded bg-gray-700 px-2 py-1 text-sm"
              >
                {PLATFORM_CONFIG[platformId as keyof typeof PLATFORM_CONFIG]?.displayName}
              </span>
            ))}
          </div>
          <button onClick={onPrevious} className="mt-2 text-sm text-blue-600 hover:underline">
            이전 단계로 돌아가 수정하기
          </button>
        </div>

        {/* 선택할 플랫폼이 남아 있을 때만 아래 보여줌 */}
        {availablePlatforms.length > 0 && (
          <div>
            <p className="mb-2 text-sm text-gray-300">사용하지 않던 플랫폼도 통합관리 해보세요!</p>
            <div className="mb-8 grid grid-cols-2 gap-4">
              {availablePlatforms.map((platformId) => {
                const platform = PLATFORM_CONFIG[platformId];
                if (!platform) return null;

                return (
                  <button
                    key={platformId}
                    onClick={() => handleSelection(platformId)}
                    className={`flex items-center justify-between rounded-lg p-4 text-left transition-colors ${
                      additionalPlatforms.includes(platformId)
                        ? 'bg-blue-100 text-blue-400'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span>{platform.displayName}</span>
                    {additionalPlatforms.includes(platformId) && <CheckSVG />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* button */}
      <div className="flex flex-col items-center justify-center gap-3">
        <button
          onClick={() => onNext(additionalPlatforms)}
          className="btn-gradient rounded-full px-10 py-3 font-semibold md:px-16"
        >
          {totalPlatformNum}개 플랫폼에 새 계정 만들기
        </button>

        <button onClick={() => onNext([])} className="text-sm text-gray-500 hover:underline">
          건너뛰기
        </button>
      </div>
    </div>
  );
}
