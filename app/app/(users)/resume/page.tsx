// import Link from 'next/link';
// import UploadResumeButton from './upload-resume-button';
import { Suspense } from 'react';

export default function ResumePage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-24">
      {/* <section className="mt-20 flex w-full flex-col gap-4 md:flex-row">
        <Link
          href="/app/account-status"
          className="rounded-lg bg-primary/90 p-4 text-black underline-offset-2 hover:underline"
        >
          채용 사이트별 직접 로그인이 필요하다면?
        </Link>
        <UploadResumeButton />
      </section> */}
      <Suspense fallback={<div className="bg-yellow-400">로딩 중...</div>}>
        <iframe
          src="https://tally.so/r/3E0RA2"
          width="100"
          height="100"
          className="h-dvh w-dvw"
          title="이력서 관리 랜딩페이지"
        ></iframe>
      </Suspense>
    </div>
  );
}
