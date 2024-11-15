import { Email, ErrorResponse } from './types';
import ProposalListClient from './proposal-list-client';
import EmailSkeleton from './email-skeleton';
import { Suspense } from 'react';
import { getServerAuth } from '@/app/lib/server-auth';

async function fetchEmails(page = 0, size = 20, unreadOnly = false): Promise<Email[]> {
  const { credentials } = getServerAuth();
  const response = await fetch(
    `${process.env.API_BASE_URL}/scout/proposals?page=${page}&size=${size}&unread_only=${unreadOnly}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
    }
  );

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    console.error(errorData);
    // throw new Error(errorData.detail.map((d) => d.msg).join(', '));
    throw new Error('Failed to fetch emails');
  }

  return response.json();
}

export default async function Index() {
  return (
    <div className="container mx-auto">
      <div className="w-full text-center">
        <h1 className="text-gradient mb-8 text-3xl font-bold">스카우트 제안</h1>
      </div>
      <Suspense fallback={<EmailSkeleton />}>
        <ProposalList />
      </Suspense>
    </div>
  );
}

async function ProposalList() {
  const emails = await fetchEmails(0, 20, true); // TODO: unreadOnly 기본적으로는 true 인데 만약 emails의 길이가 0이면 unreadOnly를 false로 해서 가져오기?

  console.log(emails.length);

  return <ProposalListClient emails={emails} />;
}
