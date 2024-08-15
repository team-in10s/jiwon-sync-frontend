import { getServerAuth } from '@/app/lib/server-auth';

const API_BASE_URL = process.env.API_BASE_URL; // ~i

export async function getPlatformStatusService() {
  const { credentials } = getServerAuth();

  const response = await fetch(`${API_BASE_URL}/platform/statuses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
  });

  if (!response.ok) {
    throw new Error('Resume upload failed');
  }

  return await response.json();
}
