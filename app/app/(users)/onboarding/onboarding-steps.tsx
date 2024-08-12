// app/app/(users)/onboarding/onboarding-steps.tsx

'use client';

import { useState } from 'react';
import OnboardingStep1 from './onboarding-step1';
import OnboardingStep2 from './onboarding-step2';
import OnboardingStep3 from './onboarding-step3';
import OnboardingStep4 from './onboarding-step4';
import OnboardingStep5 from './onboarding-step5';
// import { useRouter } from 'next/navigation';

export default function OnboardingSteps() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [additionalPlatforms, setAdditionalPlatforms] = useState<string[]>([]);
  // const router = useRouter();

  // const handleOnboardingComplete = (resumeData: { url?: string; file?: File }) => {
  //   // 여기에서 온보딩 데이터를 처리하거나 API로 전송할 수 있습니다.
  //   console.log('Onboarding completed:', {
  //     selectedPlatforms,
  //     additionalPlatforms,
  //     resumeData,
  //   });

  //   // 파일 업로드 처리 (필요한 경우)
  //   if (resumeData.file) {
  //     // 파일 업로드 로직 구현 (예: FormData 사용)
  //   }

  //   // 온보딩 완료 후 "/app/resume"로 이동
  //   router.push('/app/resume');
  // };

  // Step 렌더링 로직
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <OnboardingStep1 onNext={() => setCurrentStep(2)} />;
      case 2:
        return (
          <OnboardingStep2
            onNext={(platforms) => {
              setSelectedPlatforms(platforms);
              setCurrentStep(3);
            }}
          />
        );
      case 3:
        return (
          <OnboardingStep3
            selectedPlatforms={selectedPlatforms}
            onNext={(additionalPlatforms) => {
              setAdditionalPlatforms(additionalPlatforms);
              setCurrentStep(4);
            }}
            onPrevious={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <OnboardingStep4
            selectedPlatforms={[...selectedPlatforms, ...additionalPlatforms]}
            onNext={() => setCurrentStep(5)}
            onPrevious={() => setCurrentStep(3)}
          />
        );
      case 5:
        return <OnboardingStep5 />;

      // ... 다른 스텝들도 유사하게 구현
      default:
        return <div>완료</div>;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <p>현재 스텝: {currentStep}</p>
        <p> (TODO: 프로그레스 바 ui...)</p>
      </div>

      {renderStep()}
    </div>
  );
}
