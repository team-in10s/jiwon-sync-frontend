// app/app/(users)/account-status/use-cases.ts

import { HrPlatformName, PLATFORM_CONFIG } from '@/app/lib/constants';
import { getPlatformStatusService } from './services';
import { PlatformStatusItem } from './types';

export async function getPlatformStatusUseCase(): Promise<PlatformStatusItem[]> {
  const response: PlatformStatusItem[] = await getPlatformStatusService();

  // Create a map of all HrPlatformNames with initial null status
  const allPlatforms = Object.keys(PLATFORM_CONFIG)
    .filter((key): key is HrPlatformName => key !== 'jiwon' && key !== 'custom' && key !== 'jumpit')
    .reduce(
      (acc, platform) => {
        acc[platform] = { platform, status: null };
        return acc;
      },
      {} as Record<HrPlatformName, PlatformStatusItem>
    );

  console.log('allPlatforms?', allPlatforms);

  // Update the status for platforms present in the response
  response.forEach((item) => {
    if (item.platform in allPlatforms) {
      allPlatforms[item.platform].status = item.status;
    }
  });

  return Object.values(allPlatforms);
}
