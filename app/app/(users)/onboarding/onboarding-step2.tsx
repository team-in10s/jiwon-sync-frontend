// app/app/(users)/onboarding/onboarding-step2.tsx

import { useState } from 'react';
import { PLATFORM_CONFIG, HrPlatformName, PlatformName } from '@/app/lib/constants';
import CheckSVG from './check-svg';

type Step2Props = {
  onNext: (platforms: HrPlatformName[]) => void;
};

function isHrPlatformName(platform: PlatformName): platform is HrPlatformName {
  return platform !== 'jiwon' && platform !== 'custom';
}

const hrPlatforms = (Object.keys(PLATFORM_CONFIG) as PlatformName[]).filter(isHrPlatformName);

export default function OnboardingStep2({ onNext }: Step2Props) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<HrPlatformName[]>([]);

  const handleSelection = (platform: HrPlatformName) => {
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
        {hrPlatforms.map((platformId) => {
          const platform = PLATFORM_CONFIG[platformId];
          if (!platform) return null;

          return (
            <button
              key={platformId}
              onClick={() => handleSelection(platformId)}
              className={`flex items-center justify-between rounded-lg p-4 text-left transition-colors ${
                selectedPlatforms.includes(platformId)
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <span>{platform.displayName}</span>
              {selectedPlatforms.includes(platformId) && <CheckSVG />}
            </button>
          );
        })}
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
