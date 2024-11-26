'use client';

import { useState, useEffect } from 'react';
import EmailSkeleton from './email-skeleton';
import ProposalListClient from './proposal-list-client';
import { fetchEmails, fetchTotalEmailCount } from './api';
import { Email } from './types';

export default function RecruitmentPage({ searchParams }: { searchParams: { page: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [emails, setEmails] = useState<Email[]>([]);
  const [totalEmailCount, setTotalEmailCount] = useState(0);
  const currentPage = Number(searchParams?.page) || 1;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [fetchedEmails, fetchedTotalEmails] = await Promise.all([
          fetchEmails(currentPage - 1, 20),
          fetchTotalEmailCount(),
        ]);
        setEmails(fetchedEmails);
        setTotalEmailCount(fetchedTotalEmails);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div>
      {isLoading ? (
        <EmailSkeleton />
      ) : (
        <ProposalListClient emails={emails} totalEmails={totalEmailCount} />
      )}
    </div>
  );
}
