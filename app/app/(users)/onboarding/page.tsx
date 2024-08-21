// app/app/(users)/onboarding/page.tsx

import { redirect } from 'next/navigation';
import OnboardingSteps from './onboarding-steps';
import { checkAndRedirectPlatformStatus } from './use-cases';

export default async function Index() {
  let result;

  try {
    result = await checkAndRedirectPlatformStatus();
  } catch (error) {
    console.error('Error checking platform status:', error);
    return (
      <div className="container mx-auto mt-16">
        <div className="flex flex-col justify-center">
          <h1 className="mb-8 text-2xl font-bold">앗, 잠시 후에 다시 시도해 주세요.</h1>
          <p>
            에러가 발생했어요. 잠시 후에 다시 시도해 주시거나 카카오톡 고객센터로 문의해 주세요.
          </p>
          {/* <p>{error.message}</p> */}
        </div>
      </div>
    );
  }

  if ('shouldRedirect' in result) {
    redirect(result.destination);
  }

  return (
    <div className="container mx-auto mt-16">
      <div className="flex justify-center">
        <OnboardingSteps />
      </div>
    </div>
  );
}
