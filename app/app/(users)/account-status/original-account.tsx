import { HrPlatformName } from '@/app/lib/constants';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { connectOrigin } from '../onboarding/actions';
import toast from 'react-hot-toast';
import Link from 'next/link';

type Props = {
  onNextStep: () => void;
  showLoadingIndicator: Dispatch<SetStateAction<boolean>>;
  platform: HrPlatformName;
  onConnectComplete: (platform: HrPlatformName) => void;
};
export default function OriginalAccount({
  onNextStep,
  showLoadingIndicator,
  platform,
  onConnectComplete,
}: Props) {
  //
  const [originalId, setOriginalId] = useState('');
  const [originalPw, setOriginalPw] = useState('');

  const handleOriginalId = (e: ChangeEvent<HTMLInputElement>) => {
    setOriginalId(e.target.value);
  };

  const handleOriginalPw = (e: ChangeEvent<HTMLInputElement>) => {
    setOriginalPw(e.target.value);
  };

  const handleOriginalLogin = async () => {
    // 로딩 인디케이터 띄우기
    showLoadingIndicator(true);

    // 로그인 api 호출
    try {
      await connectOrigin(platform, originalId, originalPw);
      toast.success(`${platform} 로그인 성공!`);
      // 모달 닫기 && // sse 호출
      onConnectComplete(platform);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    showLoadingIndicator(false);
  };
  return (
    <div>
      <div className="mb-5 rounded-lg bg-gray-400/20 p-5">
        <div className="mb-2 flex flex-col space-y-2">
          <input
            id="original-id"
            type="text"
            value={originalId}
            onChange={handleOriginalId}
            required
            placeholder="이메일 계정을 입력하세요."
            className="rounded-md border border-gray-500 bg-gray-700 p-2 text-white"
          />
        </div>
        <div className="mb-2 flex flex-col space-y-2">
          <input
            id="original-pw"
            type="password"
            required
            value={originalPw}
            onChange={handleOriginalPw}
            placeholder="비밀번호를 입력하세요."
            className="rounded-md border border-gray-500 bg-gray-700 p-2 text-white"
          />
        </div>

        <div className="flex flex-col items-center space-y-2">
          <button
            className="btn-elevate mt-2 w-1/2 rounded-full border border-primary py-2 text-sm"
            onClick={handleOriginalLogin}
          >
            로그인 하기
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        <button
          onClick={onNextStep}
          className="btn-gradient w-1/2 rounded-full py-2 font-semibold disabled:opacity-50"
        >
          3초 만에 부계정 생성
        </button>
        {/* <button className="text-sm text-gray-400 underline underline-offset-2">
          로그인 과정에 문제가 있나요?
        </button> */}
        <Link href="/app/faq" className="text-sm text-gray-400 underline underline-offset-2">
          로그인 과정에 문제가 있나요?
        </Link>
      </div>
    </div>
  );
}
