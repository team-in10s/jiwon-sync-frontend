'use client';

import { useState } from 'react';
import Modal from '../../components/modal';

export default function DetailButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //   const openModal = () => {
  //     setIsModalOpen(true);
  //   };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="underline underline-offset-2">자세히 보기</button>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="동기화 완료 되었나요?">
        <div>OneID로 더 쉽게 관리하세요.</div>
        <div>111</div>
        <div>111</div>
        <div>111</div>
        <div>111</div>

        <a
          href="https://chromewebstore.google.com/detail/지원전에-sync/mpdncngepkfmhibnoiklkcphomgimbia"
          target="_blank"
          rel="noreferrer"
          className="btn-gradient px-4 py-2"
        >
          익스텐션 다운받기
        </a>
        <p className="text-sm text-gray-500">* 크롬 브라우저에서만 사용 가능합니다.</p>
      </Modal>
    </>
  );
}
