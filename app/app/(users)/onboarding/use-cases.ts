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

export async function checkAndRedirectPlatformStatus(
  currentPath: string
): Promise<RedirectResult | null> {
  try {
    const response: PlatformStatusItem[] = await getPlatformStatusService();

    const emptyStatus = response.length === 0; // 계정 생성 시도가 아예 없음

    // if (emptyStatus) {
    //   return { shouldRedirect: false, destination: '/app/onboarding' };
    // } else {
    //   return { shouldRedirect: true, destination: '/app/resume' };
    // }

    if (emptyStatus && currentPath !== '/app/onboarding') {
      return { shouldRedirect: true, destination: '/app/onboarding' };
    } else if (!emptyStatus && currentPath === '/app/onboarding') {
      return { shouldRedirect: true, destination: '/app/resume' };
    } else {
      return null; // No redirect needed
    }
  } catch (error) {
    console.error('Error in checkPlatformStatus:', error);
    return null; // In case of error, don't redirect
  }
}
