'use server';
import { revalidatePath } from 'next/cache';
import { getServerAuth } from '@/app/lib/server-auth';
import { PlatformName } from '@/app/lib/constants';

const apiUrl = process.env.API_BASE_URL;

export async function connectPlatformAction(platform: PlatformName) {
  const { credentials } = getServerAuth();

  const res = await fetch(`${apiUrl}/platform/connect/${platform}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify({}),
  });

  const data = await res.json();
  console.log('플랫폼 연결 server action & data? --------', data);

  revalidatePath('/app/sync');
  // revalidatePath('/app/sync', 'layout');
  // revalidatePath('/app/sync', 'page');
  // revalidatePath('/sync');

  return Response.json(data);
}

// to delete cache
// const clearCacheByServerAction = async (path?: string) => {
//   try {
//     if (path) {
//       revalidatePath(path);
//     } else {
//       revalidatePath('/'); // invalidate everything revalidatePath('/', 'layout');

//       revalidatePath('/[lang]');
//     }
//   } catch (error) {
//     console.error('clearCachesByServerAction=> ', error);
//   }
// };
