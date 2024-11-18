import { Email, ErrorResponse } from './types';
import ProposalListClient from './proposal-list-client';
import EmailSkeleton from './email-skeleton';
import { Suspense } from 'react';
import { getServerAuth } from '@/app/lib/server-auth';

type TotalEmailsResponse = {
  total_count: number;
};

type TotalEmailErrorResponse = {
  detail: string;
};

async function fetchTotalEmails(): Promise<number> {
  const { credentials } = getServerAuth();
  const response = await fetch(`${process.env.API_BASE_URL}/scout/proposals/count`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });

  if (!response.ok) {
    const errorData: TotalEmailErrorResponse = await response.json();
    console.error(errorData.detail);
    throw new Error('Failed to fetch total emails');
  }

  const data: TotalEmailsResponse = await response.json();
  return data.total_count;
}

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

    throw new Error('Failed to fetch emails');
  }

  return response.json();
}

export default async function Index(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="container mx-auto">
      <div className="w-full text-center">
        <h1 className="text-gradient mb-8 text-3xl font-bold">스카우트 제안</h1>
      </div>
      <Suspense fallback={<EmailSkeleton />}>
        <ProposalList currentPage={currentPage} />
      </Suspense>
    </div>
  );
}

async function ProposalList({ currentPage }: { currentPage: number }) {
  // let totalEmails = 0;
  // let allEmails: Email[] = [];

  // try {
  //   const [fetchedTotalEmails, fetchedEmails] = await Promise.all([
  //     fetchTotalEmails(),
  //     fetchEmails(currentPage - 1, 20),
  //   ]);

  //   totalEmails = fetchedTotalEmails;
  //   allEmails = fetchedEmails;
  // } catch (error) {
  //   console.error('Error fetching emails or total emails:', error);
  //   // totalEmails remains 0 and allEmails remains an empty array
  // }

  const [fetchedTotalEmails, fetchedEmails] = await Promise.all([
    fetchTotalEmails(),
    fetchEmails(currentPage - 1, 20),
  ]);

  return <ProposalListClient emails={fetchedEmails} totalEmails={fetchedTotalEmails} />;
}
