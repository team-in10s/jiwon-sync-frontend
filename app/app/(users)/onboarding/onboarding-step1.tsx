// app/app/(users)/onboarding/onboarding-step1.tsx

import Image from 'next/image';
import { useState } from 'react';
import Modal from '../../components/modal';
import Link from 'next/link';

type Step1Props = {
  onNext: () => void;
};

export default function OnboardingStep1({ onNext }: Step1Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="card w-full max-w-2xl p-8">
      {/* heading */}
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-2xl font-semibold">각 채용 플랫폼에 새로운 계정을 만듭니다.</h2>
        <p className="text-lg">
          지원전에에서 이력서 자동 업데이트부터 - 스카우트 제안관리까지 <br />{' '}
          <span className="font-bold text-primary">커리어 전용 계정</span>
          으로 이용할 수 있어요.
        </p>
      </div>

      {/* body content */}
      <div className="mb-12">
        <Image
          src="/assets/onboarding/step1.png"
          alt="각 채용 플랫폼에 새로운 계정을 만듭니다."
          width={300}
          height={170}
          className="mx-auto"
        />
      </div>

      {/* button */}
      <div className="flex flex-col items-center justify-center gap-3">
        <button onClick={onNext} className="btn-gradient rounded-full px-10 py-2 font-semibold">
          1분 만에 계정 생성 후 동기화
        </button>
        <button onClick={openModal} className="text-sm text-gray-400 underline underline-offset-2">
          왜 새로운 계정을 만드나요?
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="왜 새로운 계정을 만드나요?">
        <div className="py-2">
          <div className="mb-4">
            지원전에가 여러분의 커리어 비서가 되어 귀찮은 작업을 도와드리기 위해 커리어 전용 계정을
            만들어요.
          </div>
          <Link href="/app/faq#q2" className="underline underline-offset-2">
            자세히 알아보기
          </Link>
        </div>
      </Modal>
    </div>
  );
}
