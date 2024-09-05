// app/app/(users)/onboarding/onboarding-steps.tsx

'use client';

import { useState } from 'react';

import OnboardingStep2 from './onboarding-step2';
import OnboardingStep3 from './onboarding-step3';
import OnboardingStep4 from './onboarding-step4';
import OnboardingStep5 from './onboarding-step5';
import { HrPlatformName } from '@/app/lib/constants';
import StepProgress from './step-progress';
import OnboardingStep1 from './onboarding-step1';

export default function OnboardingSteps() {
  const [currentStep, setCurrentStep] = useState(1);

  // original 로그인 시도할 플랫폼
  const [selectedPlatforms, setSelectedPlatforms] = useState<HrPlatformName[]>([]);
  // 부계정 만들 플랫폼
  const [additionalPlatforms, setAdditionalPlatforms] = useState<HrPlatformName[]>([]);
  // original 로그인 완료한 플랫폼
  const [loggedInPlatforms, setLoggedInPlatforms] = useState<HrPlatformName[]>([]);

  // Step 렌더링 로직
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OnboardingStep1
            onNext={(platforms) => {
              setSelectedPlatforms(platforms);
              setCurrentStep(2);
            }}
          />
        );
      case 2:
        return (
          <OnboardingStep2
            onNext={() => {
              setCurrentStep(3);
            }}
            selectedPlatforms={selectedPlatforms}
            addAdditionalPlatforms={(platform: HrPlatformName) => {
              setAdditionalPlatforms([...additionalPlatforms, platform]);
            }}
            addLoggedInPlatform={(platform: HrPlatformName) => {
              setLoggedInPlatforms([...loggedInPlatforms, platform]);
            }}
          />
        );
      case 3:
        return (
          <OnboardingStep3
            loggedInPlatforms={loggedInPlatforms}
            additionalPlatforms={additionalPlatforms}
            onNext={(platformsForSecondAccount) => {
              // platformsToCreateSecondAccount: 부계정 생성하려고 선택한 플랫폼
              if (!platformsForSecondAccount) {
                // 건너뛰기
                setCurrentStep(5);
                return;
              }

              setAdditionalPlatforms(platformsForSecondAccount);
              setCurrentStep(4);
            }}
          />
        );
      case 4:
        return (
          <OnboardingStep4
            selectedPlatforms={additionalPlatforms}
            onNext={() => setCurrentStep(5)}
            onPrevious={() => setCurrentStep(3)}
          />
        );
      case 5:
        return (
          // 로그인 플랫폼 & 부계 플랫폼
          <OnboardingStep5
            loggedInPlatforms={loggedInPlatforms}
            platformsForSecondAccount={additionalPlatforms}
          />
        );

      default:
        return <div>완료</div>;
    }
  };

  return (
    <div>
      <StepProgress currentStep={currentStep} totalSteps={5} />

      {renderStep()}
    </div>
  );
}
