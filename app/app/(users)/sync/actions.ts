'use server';

import { getServerAuth } from '@/app/lib/server-auth';

export async function connectPlatform(platform: string) {
  const { credentials } = getServerAuth();

  const response = await fetch(`http://localhost:3000/api/platform/connect/${platform}`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });

  if (!response.ok) {
    throw new Error('platform connecting failed');
  }

  return response.json();
}
