// app/app/(users)/onboarding/services.ts

import { getServerAuth } from '@/app/lib/server-auth';

const API_BASE_URL = process.env.API_BASE_URL; // ~i

export async function connectPlatformService(platform: string, data?: { requestId: string }) {
  const bodyData = data ? { request_id: data.requestId } : {};

  const { credentials } = getServerAuth();

  const response = await fetch(`${API_BASE_URL}/platform/connect/${platform}`, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
  });

  if (!response.ok) {
    throw new Error('connect platform upload failed');
  }

  return await response.json();
}
