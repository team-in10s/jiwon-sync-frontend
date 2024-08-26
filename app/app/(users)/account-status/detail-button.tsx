'use client';

import { useState } from 'react';
import Modal from '../../components/modal';
import SliderContent from './slider-content';

export default function DetailButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal} className="underline underline-offset-2">
        자세히 보기
      </button>
      <Modal theme="dark" isOpen={isModalOpen} onClose={closeModal} title="커리어 전용 계정 One-id">
        <SliderContent />

        <div className="flex flex-col items-center justify-center gap-2">
          <a
            href="https://chromewebstore.google.com/detail/지원전에-sync/mpdncngepkfmhibnoiklkcphomgimbia"
            target="_blank"
            rel="noreferrer"
            className="btn-gradient rounded-full px-6 py-1.5"
            onClick={closeModal}
          >
            익스텐션 다운받기
          </a>
          <p className="text-xs text-gray-500">* 크롬 브라우저에서만 사용 가능합니다.</p>
        </div>
      </Modal>
    </>
  );
}
