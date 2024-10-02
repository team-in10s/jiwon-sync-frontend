'use client';

import { useState } from 'react';
import Modal from '../../components/modal';
import UploadResume from './upload-resume';

export default function UploadResumeButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="이력서 업로드" theme="dark">
        <UploadResume onFinish={closeModal} />
      </Modal>

      <button
        onClick={openModal}
        className="basis-4/5 rounded-lg bg-gray-600 p-4 font-semibold hover:bg-gray-700"
      >
        📁 이력서 파일 또는 링크 업로드
        <p className="text-sm text-gray-400">아래 양식에 자동 업데이트됩니다.</p>
      </button>
    </>
  );
}
