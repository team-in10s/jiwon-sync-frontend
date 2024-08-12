'use client';

import { useState } from 'react';
import OnboardingStep1 from './onboarding-step1';
import OnboardingStep2 from './onboarding-step2';

export default function OnboardingSteps() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  console.log(selectedPlatforms);

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
