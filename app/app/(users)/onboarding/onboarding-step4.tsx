// app/app/(users)/onboarding/onboarding-step4.tsx

// import { useState } from 'react';
import { HR_PLATFORMS } from './constants';

type Step4Props = {
  selectedPlatforms: string[];
  onNext: () => void;
  onPrevious: () => void;
};

export default function OnboardingStep4({ selectedPlatforms, onNext, onPrevious }: Step4Props) {
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
        {/* 선택한 채용 플랫폼의 계정을 생성해주세요. */}
        채용 플랫폼에 계정을 순차적으로 만들고 있어요.
      </p>
      {/* <p className="mb-4 text-center text-sm text-gray-500">
        각 플랫폼별로 계정을 생성하고 확인란을 체크해주세요.
      </p> */}
      <p className="mb-4 text-center">필요한 약관 동의와, 전화번호 인증을 진행해주세요.</p>

      <div className="mb-8">
        {selectedPlatforms.map((platformId) => {
          const platform = HR_PLATFORMS.find((p) => p.id === platformId);
          return (
            <div key={platformId}>
              <div>{platform?.name}</div>
            </div>
            // <div key={platformId} className="mb-4 flex items-center justify-between">
            //   <span>{platform?.name}</span>
            //   <button
            //     onClick={() => handlePlatformCompletion(platformId)}
            //     className={`rounded-full p-2 ${
            //       completedPlatforms.includes(platformId)
            //         ? 'bg-green-500 text-white'
            //         : 'bg-gray-200 text-gray-600'
            //     }`}
            //   >
            //     {completedPlatforms.includes(platformId) ? '완료' : '진행 중'}
            //   </button>
            // </div>
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
