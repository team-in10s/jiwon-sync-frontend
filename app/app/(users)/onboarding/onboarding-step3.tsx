// app/app/(users)/onboarding/onboarding-step3.tsx

import { useState } from 'react';
import { HR_PLATFORMS } from './constants';

type Step3Props = {
  onNext: (additionalPlatforms: string[]) => void;
  onPrevious: () => void;
  selectedPlatforms: string[];
};

export default function OnboardingStep3({ onNext, onPrevious, selectedPlatforms }: Step3Props) {
  const [additionalPlatforms, setAdditionalPlatforms] = useState<string[]>([]);

  const availablePlatforms = HR_PLATFORMS.filter(
    (platform) => !selectedPlatforms.includes(platform.id)
  );

  const handleSelection = (platformId: string) => {
    setAdditionalPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((p) => p !== platformId) : [...prev, platformId]
    );
  };

  return (
    <div className="card w-full max-w-2xl p-8">
      <p className="mb-6 text-center text-2xl font-bold">
        추가로 사용할 채용 플랫폼을 선택해주세요.
      </p>
      <p className="mb-4 text-center">
        월 평균 4건 이상의 스카웃 제안을 받는 인재는 <br />
        3개 이상의 채용 플랫폼을 이용하고 있어요!
      </p>

      <div className="mb-6">
        <p className="mb-2 text-sm text-gray-300">
          이미 선택하신 채용 플랫폼 : {selectedPlatforms.length}개
        </p>
        <div className="rounded-lg bg-gray-800 p-3 text-white">
          {HR_PLATFORMS.filter((platform) => selectedPlatforms.includes(platform.id)).map(
            (platform) => (
              <span
                key={platform.id}
                className="mr-2 inline-block rounded bg-gray-700 px-2 py-1 text-sm"
              >
                {platform.name}
              </span>
            )
          )}
        </div>
        <button onClick={onPrevious} className="mt-2 text-sm text-blue-600 hover:underline">
          이전 단계로 돌아가 수정하기
        </button>
      </div>

      <p className="mb-2 text-sm text-gray-300">
        추가로 선택하실 수 있는 채용 플랫폼 : {additionalPlatforms.length}개
      </p>
      <div className="mb-8 grid grid-cols-2 gap-4">
        {availablePlatforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => handleSelection(platform.id)}
            className={`flex items-center justify-between rounded-lg p-4 text-left transition-colors ${
              additionalPlatforms.includes(platform.id)
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <span>{platform.name}</span>
            {additionalPlatforms.includes(platform.id) && (
              <svg
                className="size-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        <button
          onClick={() => onNext(additionalPlatforms)}
          className="btn-gradient rounded-full px-16 py-3 font-semibold"
        >
          선택완료
        </button>
        <button onClick={() => onNext([])} className="text-sm text-gray-500 hover:underline">
          건너뛰기
        </button>
      </div>
    </div>
  );
}
