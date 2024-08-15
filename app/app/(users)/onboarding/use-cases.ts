// app/app/(users)/onboarding/use-cases.ts

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
