import ProposalList from './proposal-list';

export default async function RecruitmentPage(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  return <ProposalList currentPage={currentPage} />;
}
