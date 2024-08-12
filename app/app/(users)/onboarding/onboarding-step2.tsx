// app/app/(users)/onboarding/onboarding-step2.tsx

import { useState } from 'react';
import { HR_PLATFORMS } from './constants';

type Step2Props = {
  onNext: (platforms: string[]) => void;
};

export default function OnboardingStep2({ onNext }: Step2Props) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const handleSelection = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  return (
    <div className="card w-full max-w-2xl p-8">
      {/* heading */}
      <p className="mb-6 text-center text-2xl font-bold">
        주로 사용하는 채용 플랫폼을 선택해주세요.
      </p>
      {/* sub-heading */}
      <p className="mb-12 text-center text-lg">계정 관리는 훨씬 더 쉬워질거에요.</p>

      <div className="mb-8 grid grid-cols-2 gap-4">
        {HR_PLATFORMS.map((platform) => (
          <button
            key={platform.id}
            onClick={() => handleSelection(platform.id)}
            className={`flex items-center justify-between rounded-lg p-4 text-left transition-colors ${
              selectedPlatforms.includes(platform.id)
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <span>{platform.name}</span>
            {selectedPlatforms.includes(platform.id) && (
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

      <div className="flex justify-center">
        <button
          onClick={() => onNext(selectedPlatforms)}
          disabled={selectedPlatforms.length === 0}
          className="btn-gradient rounded-full px-16 py-3 font-semibold disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}
