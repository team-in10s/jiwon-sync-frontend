import dynamic from 'next/dynamic';
import Image from 'next/image';

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

        <div className="relative h-48 w-full md:h-72">
          <Image
            src="/assets/jiwon_download/image.png"
            alt="지원전에 Desktop 다운로드"
            fill
            objectFit="contain"
            className="mx-auto"
          />
        </div>

        <DownloadSection />
      </div>
    </div>
  );
}
