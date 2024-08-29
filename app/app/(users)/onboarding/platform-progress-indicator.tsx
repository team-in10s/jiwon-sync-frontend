// app/app/(users)/onboarding/PlatformProgressIndicator.tsx

import { PLATFORM_CONFIG, HrPlatformName } from '@/app/lib/constants';

type PlatformProgressIndicatorProps = {
  platforms: HrPlatformName[];
  currentPlatformIndex: number;
};

export default function PlatformProgressIndicator({
  platforms,
  currentPlatformIndex,
}: PlatformProgressIndicatorProps) {
  return (
    <div className="mb-3 flex items-center justify-between rounded-lg border border-dashed border-gray-400/40 p-3 text-sm">
      <div className="flex flex-wrap items-center">
        {platforms.map((platform, index) => (
          <div
            key={platform}
            className={`flex items-center ${
              index === currentPlatformIndex ? 'opacity-100' : 'opacity-50'
            }`}
          >
            {index > 0 && <div className="mx-2 h-0.5 w-3 bg-gray-200"></div>}
            <div>{PLATFORM_CONFIG[platform]?.displayName}</div>
          </div>
        ))}
      </div>

      <div className="hidden text-xs text-gray-400 md:block">
        {currentPlatformIndex + 1} / {platforms.length}
      </div>
    </div>
  );
}
