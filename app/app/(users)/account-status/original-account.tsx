import { HrPlatformName } from '@/app/lib/constants';
import { ChangeEvent, Dispatch, SetStateAction, useState, KeyboardEvent } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { connectOriginAccount } from '@/app/lib/api';
import { getPasswordGuide, getPlaceholderOriginLogin } from '@/app/lib/utils';
import MessageChannel from 'jiwon-message-channel';
import { LOGIN_PAGE_URLS, LOGIN_SCRIPT_URL, ORIGINAL_LOGIN_JOB_ID } from '../constants';
import { originalLoginFunction, convertIIFEString } from '../lib';

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
  const [originalId, setOriginalId] = useState('');
  const [originalPw, setOriginalPw] = useState('');

  // NOTE: react native
  const postMessage = MessageChannel.usePostMessage();

  const handleOriginalId = (e: ChangeEvent<HTMLInputElement>) => {
    setOriginalId(e.target.value);
  };

  const handleOriginalPw = (e: ChangeEvent<HTMLInputElement>) => {
    setOriginalPw(e.target.value);
  };

  const handleOriginalLogin = async () => {
    if (!originalId.trim() || !originalPw.trim()) return;

    // 로딩 인디케이터 띄우기
    showLoadingIndicator(true);

    // 모바일에서 실행
    if (MessageChannel.isEnabled()) {
      postMessage({
        isAsync: true,
        message: {
          taskId: ORIGINAL_LOGIN_JOB_ID[platform]!,
          type: 'executeScript',
          payload: {
            url: LOGIN_PAGE_URLS[platform]!,
            keepAlive: false,
            // script: MessageChannel.toIIFEString(wrappedFunction),
            script: convertIIFEString(
              originalLoginFunction,
              originalId,
              originalPw,
              platform,
              LOGIN_SCRIPT_URL[platform]!
            ),
          },
        },
      })
        .then((result) => {
          if (result.type === 'scrapResult' && result.payload.success) {
            toast.success('로그인 성공!');
            // 모달 닫기 && sse 호출
            onConnectComplete(platform);
          } else {
            toast.error('로그인 실패. 아이디 또는 비밀번호를 다시 확인해주세요.');
          }
        })
        .catch((error) => {
          console.error('original-account postMessage error: ', error);
          alert('error: ' + JSON.stringify(error));
        })
        .finally(() => {
          showLoadingIndicator(false);
        });

      return;
    }

    // 로그인 api 호출
    try {
      await connectOriginAccount(platform, originalId, originalPw);
      toast.success('로그인 성공!');
      // 모달 닫기 && sse 호출
      onConnectComplete(platform);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          error.message || '알 수 없는 오류입니다. 페이지 하단의 고객센터로 문의해 주세요.'
        );
      }
    }

    showLoadingIndicator(false);
  };

  const isSubmitDisabled = !originalId.trim() || !originalPw.trim();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleOriginalLogin();
    }
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
            onKeyDown={handleKeyDown}
            required
            placeholder={getPlaceholderOriginLogin(platform)}
            className="rounded-md border border-gray-500 bg-gray-700 p-2 text-white"
          />
        </div>
        <div className="mb-2 flex flex-col space-y-1">
          <input
            id="original-pw"
            type="password"
            required
            value={originalPw}
            onChange={handleOriginalPw}
            onKeyDown={handleKeyDown}
            placeholder="비밀번호를 입력하세요."
            className="rounded-md border border-gray-500 bg-gray-700 p-2 text-white"
          />
          <p className="text-sm text-gray-300">* 비밀번호 규칙: {getPasswordGuide(platform)}</p>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <button
            disabled={isSubmitDisabled}
            className="btn-elevate mt-2 w-1/2 rounded-full border bg-tertiary py-2 text-sm text-primary"
            onClick={handleOriginalLogin}
          >
            로그인 하기
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        <Link href="/app/faq" className="text-sm text-gray-400 underline underline-offset-2">
          로그인 과정에 문제가 있나요?
        </Link>
        <button
          onClick={onNextStep}
          className="btn-gradient w-2/3 rounded-full py-2 text-sm font-semibold disabled:opacity-50 md:w-1/2 md:text-base"
        >
          3초 만에 부계정 생성
        </button>
      </div>
    </div>
  );
}
