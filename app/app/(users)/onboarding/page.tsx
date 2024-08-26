// app/app/(users)/onboarding/page.tsx

import OnboardingSteps from './onboarding-steps';

export default async function Index() {
  return (
    <div className="container mx-auto mt-16">
      <div className="flex justify-center">
        <OnboardingSteps />
      </div>
    </div>
  );
}
