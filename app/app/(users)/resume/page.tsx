'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import UploadResumeButton from './upload-resume-button';
import { getMainResumeStatus } from '@/app/lib/api';
import Modal from '../../components/modal';

export default function ResumePage() {
  const [showModal, setShowModal] = useState(false);
  const [tallyUrl, setTallyUrl] = useState('');

  useEffect(() => {
    const checkResumeStatus = async () => {
      try {
        const status = await getMainResumeStatus();
        if (status.processing) {
          setShowModal(true);
        }
        // JSON 데이터 파싱 및 URL 파라미터 생성
        const baseUrl =
          'https://tally.so/embed/n9v45X?hideTitle=1&transparentBackground=1&dynamicHeight=1';
        if (status.resumeJson) {
          const resumeData = JSON.parse(status.resumeJson);
          const params = new URLSearchParams();

          // resumeData의 모든 key-value를 URL 파라미터로 추가
          Object.entries(resumeData).forEach(([key, value]) => {
            params.append(key, value as string);
          });

          // Tally 폼 URL 생성
          setTallyUrl(`${baseUrl}&${params.toString()}`);
        } else {
          setTallyUrl(baseUrl);
        }
      } catch (error) {
        console.error('Error checking resume status:', error);
      }
    };

    checkResumeStatus();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center md:px-12 lg:px-24">
      <section className="mb-4 mt-2 flex w-full flex-col gap-4 md:flex-row">
        <Link
          href="/app/account-status"
          className="rounded-lg bg-primary/90 p-4 text-white underline-offset-2 hover:underline"
        >
          채용 사이트별 직접 로그인이 필요하다면?
        </Link>
        <UploadResumeButton />
      </section>

      {tallyUrl ? (
        <div className="relative h-[60svh] w-full md:h-[70svh] lg:h-[80svh]">
          <iframe
            src={tallyUrl}
            width="100"
            height="100"
            // className="h-dvh w-dvw"
            className="size-full"
            title="이력서 관리 랜딩페이지"
          ></iframe>
        </div>
      ) : (
        // 기존 정적 URL (주석 처리)
        // <iframe
        //   src="https://tally.so/r/3E0RA2"
        //   width="100"
        //   height="100"
        //   className="h-dvh w-dvw"
        //   title="이력서 관리 랜딩페이지"
        // ></iframe>
        <div className="mt-10">
          <p className="text-gray-400">기존 이력서 불러오는 중...</p>
        </div>
      )}

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="이력서 동기화 진행 중"
          theme="dark"
        >
          <div className="mx-auto w-full max-w-lg text-center">
            <div className="card mb-6 p-6">
              <p className="mb-4 text-xl font-semibold">이력서 동기화가 진행 중입니다.</p>
              <p className="mb-2">3영업일 이내에 완료될 예정입니다.</p>
              <p className="mb-4">완료 후 문자로 알림이 발송됩니다.</p>
            </div>
            <p className="mb-3 text-sm text-gray-400">
              *업로드된 내용은 상단 [커리어 계정 관리] -{'>'} [one-id 자세히 보기]에서 확인 할 수
              있습니다.
            </p>
            <p className="mb-6 text-sm text-gray-400">
              *추가 문의 사항은 페이지 하단의 [고객센터]를 통해 문의해주세요.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="btn-gradient w-full rounded-full py-2 font-semibold"
            >
              다시 업로드하기
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
