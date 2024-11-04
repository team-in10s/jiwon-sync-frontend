'use server';

import { getServerAuth } from '@/app/lib/server-auth';

export async function deleteAccountAction() {
  const { credentials } = getServerAuth();

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/auth/user`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete account');
    }

    return { success: true };
  } catch (error) {
    const err = error as Error; // Type assertion
    console.error('Error deleting account:', error);
    return { success: false, error: err.message };
  }
}
