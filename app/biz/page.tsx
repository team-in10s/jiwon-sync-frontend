'use client';

import { useEffect, useRef } from 'react';

export default function BizPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (iframeRef.current) {
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        iframeRef.current.style.height = `${viewportHeight}px`;
        iframeRef.current.style.width = `${viewportWidth}px`;
      }
    };

    // 초기 크기 설정
    handleResize();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);

    // 클린업
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="h-screen w-screen overflow-hidden">
      <iframe
        ref={iframeRef}
        src="https://friendly-decade-038255.framer.app/biz"
        className="border-none"
        title="비즈니스 페이지"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          width: '100vw',
          height: '100vh',
        }}
      />
    </main>
  );
}
