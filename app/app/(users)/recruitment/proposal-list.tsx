import { Email, ErrorResponse } from './types';
import ProposalListClient from './proposal-list-client';
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

async function ProposalList({ currentPage }: { currentPage: number }) {
  const [fetchedTotalEmails, fetchedEmails] = await Promise.all([
    fetchTotalEmails(),
    fetchEmails(currentPage - 1, 20),
  ]);

  return <ProposalListClient emails={fetchedEmails} totalEmails={fetchedTotalEmails} />;
}

export default ProposalList;
