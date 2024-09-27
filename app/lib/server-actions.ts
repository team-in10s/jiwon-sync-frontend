'use server';

import { revalidatePath } from 'next/cache';
import { getServerAuth } from './server-auth';

const baseUrl = process.env.API_BASE_URL;

export async function getPlatformStatus(needRevalidate?: 'needRevalidate') {
  const { credentials } = getServerAuth();

  const response = await fetch(`${baseUrl}/platform/statuses`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${credentials}`,
    },
    next: {
      tags: ['platform-status'], // Add a tag to the cache
      revalidate: 30, // 30 seconds
    },
  });

  if (needRevalidate) {
    revalidatePath('/app/async');
  }

  if (!response.ok) {
    throw new Error('get platform status failed');
  }

  const data = await response.json();
  console.log('getPlatformStatus server action data: ', data);
  /*
  
  [
    { platform: 'jumpit', status: 'completed' },
    { platform: 'saramin', status: 'failed' }
  ]
  */

  return data;
}

export async function tryRevalidate() {
  revalidatePath('/app/sync');
  revalidatePath('/app/sync', 'layout');
  revalidatePath('/app/sync', 'page');
  revalidatePath('/sync');
}
