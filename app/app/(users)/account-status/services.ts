// app/app/(users)/account-status/services.ts

import { baseFetch, getAuthHeaders } from '@/app/lib/base-api-client';
import { getServerAuth } from '@/app/lib/server-auth';
import { PlatformStatusItem } from './types';

export async function getPlatformStatusService(): Promise<PlatformStatusItem[]> {
  const { credentials } = getServerAuth();

  try {
    const response = await baseFetch<PlatformStatusItem[]>('/platform/statuses', {
      method: 'GET',
      headers: getAuthHeaders(credentials),
    });

    return response;
  } catch (error) {
    console.error('Failed to fetch platform statuses:', error);
    throw new Error('Failed to fetch platform statuses');
  }
}
