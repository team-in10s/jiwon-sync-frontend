import OnboardingSteps from './onboarding-steps';

export default function Index() {
  return (
    <div className="container mx-auto">
      <div className="w-full text-center">
        <h1 className="text-gradient mb-8 text-3xl font-bold">onboarding</h1>
      </div>

      <div className="flex justify-center">
        <OnboardingSteps />
      </div>
    </div>
  );
}
