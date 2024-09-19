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
        const baseUrl = 'https://tally.so/r/n9v45X';
        if (status.resumeJson) {
          const resumeData = JSON.parse(status.resumeJson);
          const params = new URLSearchParams();

          // resumeData의 모든 key-value를 URL 파라미터로 추가
          Object.entries(resumeData).forEach(([key, value]) => {
            params.append(key, value as string);
          });

          // Tally 폼 URL 생성
          setTallyUrl(`${baseUrl}?${params.toString()}`);
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
    <div className="flex min-h-screen flex-col items-center px-24">
      <section className="mt-20 flex w-full flex-col gap-4 md:flex-row">
        <Link
          href="/app/account-status"
          className="rounded-lg bg-primary/90 p-4 text-black underline-offset-2 hover:underline"
        >
          채용 사이트별 직접 로그인이 필요하다면?
        </Link>
        <UploadResumeButton />
      </section>

      {tallyUrl ? (
        <iframe
          src={tallyUrl}
          width="100"
          height="100"
          className="h-dvh w-dvw"
          title="이력서 관리 랜딩페이지"
        ></iframe>
      ) : (
        // 기존 정적 URL (주석 처리)
        // <iframe
        //   src="https://tally.so/r/3E0RA2"
        //   width="100"
        //   height="100"
        //   className="h-dvh w-dvw"
        //   title="이력서 관리 랜딩페이지"
        // ></iframe>
        <div>로딩 중...</div>
      )}

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="이력서 동기화 진행 중"
          theme="dark"
        >
          <div className="text-center max-w-lg w-full mx-auto">
            <div className="card p-6 mb-6">
              <p className="text-xl font-semibold mb-4">이력서 동기화가 진행 중입니다.</p>
              <p className="mb-2">24시간 이내에 완료될 예정입니다.</p>
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
