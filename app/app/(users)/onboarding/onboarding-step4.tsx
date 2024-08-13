// app/app/(users)/onboarding/onboarding-step4.tsx

// import { useState } from 'react';
import { PLATFORM_CONFIG, HrPlatformName } from '@/app/lib/constants';

type Step4Props = {
  selectedPlatforms: HrPlatformName[];
  onNext: () => void;
  onPrevious: () => void;
};

export default function OnboardingStep4({ selectedPlatforms, onNext, onPrevious }: Step4Props) {
  console.log(selectedPlatforms);
  // 임시 주석 처리
  //   const [completedPlatforms, setCompletedPlatforms] = useState<string[]>([]);

  //   const handlePlatformCompletion = (platformId: string) => {
  //     setCompletedPlatforms((prev) =>
  //       prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId]
  //     );
  //   };

  return (
    <div className="card w-full max-w-2xl p-8">
      <p className="mb-6 text-center text-2xl font-bold">
        채용 플랫폼에 계정을 순차적으로 만들고 있어요.
      </p>
      <p className="mb-4 text-center">필요한 약관 동의와, 전화번호 인증을 진행해주세요.</p>

      <div className="mb-8">
        {selectedPlatforms.map((platformId) => {
          const platform = PLATFORM_CONFIG[platformId as keyof typeof PLATFORM_CONFIG];
          return (
            <div key={platformId}>
              <div>{platform?.displayName}</div>
            </div>
          );
        })}
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
  );
}
