import dynamic from 'next/dynamic';

// 참고: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#importing-named-exports
const DownloadSection = dynamic(
  () => import('./download-section').then((mod) => mod.DownloadSection),
  {
    ssr: false,
  }
);

export default function JiwonDownloadPage() {
  return (
    <div className="container flex flex-col items-center justify-center">
      <h1 className="mb-8 text-center text-3xl font-semibold md:text-4xl">
        동기화를 위해 <br /> 지원전에 Desktop App 설치가 필요합니다.
      </h1>

      <div className="flex w-full max-w-lg flex-col items-center gap-14">
        <p className="text-xl md:text-2xl">Windows 10, MacOS 11 이상 지원</p>

        <div className="h-80 w-full bg-gray-700/50">image</div>

        <DownloadSection />
      </div>
    </div>
  );
}
