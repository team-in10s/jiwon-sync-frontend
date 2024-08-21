// app/app/(users)/onboarding/page.tsx

import OnboardingSteps from './onboarding-steps';
import { checkAndRedirectPlatformStatus } from './use-cases';

export default async function Index() {
  let error: Error | null = null;
  try {
    await checkAndRedirectPlatformStatus();
  } catch (e) {
    error = e instanceof Error ? e : new Error('An unknown error occurred');
    console.error('Error fetching platform status:', error);
  }

  if (error) {
    return (
      <div className="container mx-auto mt-16">
        <div className="flex justify-center">
          <h1 className="text-gradient mb-8 text-3xl font-bold">
            앗, 잠시 후에 다시 시도해 주세요.
          </h1>
          <p>
            에러가 발생했어요. 잠시 후에 다시 시도해 주시거나 카카오톡 고객센터로 문의해 주세요.{' '}
          </p>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-16">
      <div className="flex justify-center">
        <OnboardingSteps />
      </div>
    </div>
  );
}
