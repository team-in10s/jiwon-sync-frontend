'use client';

import toast from 'react-hot-toast';

export default function JiwonDownloadPage() {
  const currentUserAgent = navigator.userAgent.toLowerCase();
  const isMobile = /iphone|ipad|ipod|android/i.test(currentUserAgent);
  const isMacOs = /mac os/i.test(currentUserAgent);
  const isWindows = /windows/i.test(currentUserAgent);

  const handleClickDownload = () => {
    // 모바일 경우에는 데스크탑에서 다운 받으라고 하기
    if (isMobile) {
      toast.error('데스크탑에서 다운로드 하세요.');
      return;
    }

    // 1. 파일 다운로드 - TODO

    // 2. 다운로드 완료 UI
    toast.success('준비 완료! 다운로드 받은 앱에서 로그인하여 시작하세요.', { icon: '🎉' });
  };
  return (
    <div className="container flex flex-col items-center justify-center">
      <h1 className="mb-8 text-center text-3xl font-semibold md:text-4xl">
        동기화를 위해 <br /> 지원전에 Desktop App 설치가 필요합니다.
      </h1>

      <div className="flex w-full max-w-lg flex-col items-center gap-14">
        <p className="text-xl md:text-2xl">Windows 10, MacOS 11 이상 지원</p>

        <div className="h-80 w-full bg-gray-700/50">image</div>

        <div className="text-center">
          <button
            onClick={handleClickDownload}
            className="btn-gradient mb-5 rounded-full px-14 py-3 text-lg font-medium md:text-xl"
          >
            {isMacOs ? 'Mac용 다운로드' : isWindows ? 'Windows용 다운로드' : 'Desktop App 다운로드'}
          </button>
          <p className="text-sm text-gray-300">
            이미 다운로드 받았나요?
            <span className="underline underline-offset-2"> Desktop App에서 로그인</span>
          </p>
        </div>
      </div>
    </div>
  );
}
