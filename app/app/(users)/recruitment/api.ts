import { Email, TotalEmailsResponse, TotalEmailErrorResponse, ErrorResponse } from './types';
import { getUserAuth } from '@/app/lib/client-auth';

export async function fetchTotalEmailCount(): Promise<number> {
  const { credentials } = getUserAuth();

  const response = await fetch('/api/recruitment-proposals/count', {
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
  });

  if (!response.ok) {
    const errorData: TotalEmailErrorResponse = await response.json();
    console.error(errorData.detail);
    throw new Error('총 메일 갯수 조회 실패');
  }
  const data: TotalEmailsResponse = await response.json();
  return data.total_count;
}

export async function fetchEmails(page: number, size: number): Promise<Email[]> {
  const { credentials } = getUserAuth();

  const response = await fetch(`/api/recruitment-proposals?page=${page}&size=${size}`, {
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    console.error(errorData);
    throw new Error('메일 조회 실패');
  }
  const data: Email[] = await response.json();
  return data;
}
