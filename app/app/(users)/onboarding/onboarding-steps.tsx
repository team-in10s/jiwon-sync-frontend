// app/app/(users)/onboarding/onboarding-steps.tsx

'use client';

import { useState } from 'react';
import OnboardingStep1 from './onboarding-step1';
import OnboardingStep2 from './onboarding-step2';
import OnboardingStep3 from './onboarding-step3';

export default function OnboardingSteps() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

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
              console.log('Additional platforms:', additionalPlatforms);
              setCurrentStep(4);
            }}
            onPrevious={() => setCurrentStep(2)}
          />
        );

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
