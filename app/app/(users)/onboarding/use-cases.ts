// app/app/(users)/onboarding/use-cases.ts

import { redirect } from 'next/navigation';
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

export async function checkAndRedirectPlatformStatus(): Promise<void> {
  const response: PlatformStatusItem[] = await getPlatformStatusService();

  const emptyStatus = response.length === 0; // 계정 생성 시도가 아예 없음

  if (emptyStatus) {
    redirect('/app/onboarding');
  } else {
    redirect('/app/resume');
  }
}
