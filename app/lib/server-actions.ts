import { getServerAuth } from './server-auth';

const baseUrl = process.env.API_BASE_URL;

export async function getPlatformStatus() {
  const { credentials } = getServerAuth();

  const response = await fetch(`${baseUrl}/platform/statuses`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });

  if (!response.ok) {
    throw new Error('get platform status failed');
  }

  return response.json();
}
