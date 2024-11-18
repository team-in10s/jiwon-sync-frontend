import { Suspense } from 'react';
import ProposalList from './proposal-list';
import EmailSkeleton from './email-skeleton';

export default async function RecruitmentPage(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <Suspense key={currentPage} fallback={<EmailSkeleton />}>
      <ProposalList currentPage={currentPage} />
    </Suspense>
  );
}
