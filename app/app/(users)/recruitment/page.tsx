import { Suspense } from 'react';
import ProposalList from './proposal-list';
import Loading from './loading';

export default async function RecruitmentPage(props: {
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
      <Suspense fallback={<Loading />}>
        <ProposalList currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
