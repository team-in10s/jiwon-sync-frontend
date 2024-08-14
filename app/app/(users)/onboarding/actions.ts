// app/app/(users)/onboarding/actions.ts

'use server';

import { connectPlatformUseCase } from './use-cases';
import { redirect } from 'next/navigation';
import { HrPlatformName } from '@/app/lib/constants';
// import { connectPlatformService } from './services';
import { getServerAuth } from '@/app/lib/server-auth';

const API_BASE_URL = process.env.API_BASE_URL; // ~i

export async function redirectResumeAction() {
  redirect('/app/resume');
}

export async function connectEmailPlatformAction(platform: HrPlatformName) {
  // connectPlatformUseCase(platform); // 테스트용으로 use case 스킵하고...
  // connectPlatformService(platform);

  const { credentials } = getServerAuth();

  fetch(`${API_BASE_URL}/platform/connect/${platform}`, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
  });

  return { success: true };
}

export async function connectPhonePlatformAction(
  platform: HrPlatformName,
  data: { requestId: string }
) {
  //
  connectPlatformUseCase(platform, data);
  console.log('connectPlatformAction', platform);
}
