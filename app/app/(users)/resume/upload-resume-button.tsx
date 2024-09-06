'use client';

import { useState } from 'react';
import Modal from '../../components/modal';

export default function UploadResumeButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = async () => {
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="hhhhh" theme="dark">
        <div>
          <div>gkgkkgkg</div>
        </div>
      </Modal>

      <button
        onClick={() => {
          // 모달 띄우기
          openModal();
          // 이력서 파일 또는 링크 인풋
          //
        }}
        className="basis-4/5 rounded-lg bg-gray-600 p-4 font-semibold hover:bg-gray-700"
      >
        📁 이력서 파일 또는 링크 업데이트
      </button>
    </>
  );
}
