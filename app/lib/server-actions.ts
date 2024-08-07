import { getServerAuth } from './server-auth';

export async function getPlatformStatus() {
  const { credentials } = getServerAuth();

  const response = await fetch('http://localhost:3000/api/platform/statuses', {
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
