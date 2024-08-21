// app/app/(users)/onboarding/use-cases.ts

import { getPlatformStatusService } from '../account-status/services';
import { PlatformStatusItem } from '../account-status/types';
import { connectPlatformService } from './services';
import { HrPlatformName, PLATFORM_CONFIG } from '@/app/lib/constants';

export async function connectPlatformUseCase(
  platform: HrPlatformName,
  data?: { requestId: string }
) {
  if (!PLATFORM_CONFIG[platform]?.authType) {
    throw new Error('연결할 수 없는 플랫폼 입니다.');
  }

  if (PLATFORM_CONFIG[platform]?.authType === 'email') {
    connectPlatformService(platform);
    return;
  }

  if (PLATFORM_CONFIG[platform]?.authType === 'phone') {
    connectPlatformService(platform, data);
    return;
  }
}

export type RedirectResult = {
  shouldRedirect: boolean;
  destination: string;
};

export async function checkAndRedirectPlatformStatus(): Promise<
  RedirectResult | PlatformStatusItem[]
> {
  try {
    const response: PlatformStatusItem[] = await getPlatformStatusService();

    const emptyStatus = response.length === 0; // 계정 생성 시도가 아예 없음

    if (emptyStatus) {
      return { shouldRedirect: true, destination: '/app/onboarding' };
    } else {
      return { shouldRedirect: true, destination: '/app/resume' };
    }
  } catch (error) {
    console.error('Error in checkPlatformStatus:', error);
    throw error;
  }
}
