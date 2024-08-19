// app/app/(users)/onboarding/step-progress.tsx

type StepProgressProps = {
  currentStep: number;
  totalSteps: number;
};

export default function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <div className="mb-8 flex w-full items-center">
      <div className="relative h-1 grow rounded-full bg-gray-200">
        <div
          className="absolute h-1 rounded-full bg-blue-600 transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
      <div className="ml-4 whitespace-nowrap text-sm text-gray-500">
        {currentStep}/{totalSteps}단계
      </div>
    </div>
  );
}
