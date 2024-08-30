import { Dispatch, SetStateAction, useRef, useState } from 'react';
import PlatformConnectButton from '../onboarding/platform-connect-button';
import PlatformTerms from '../onboarding/platform-terms';
import { getUserAuth } from '@/app/lib/client-auth';
import { getRequestId, submitAuthCode } from '../onboarding/actions';
import { connectPlatform, connectPlatformByDesktop, getAuthCodeStatusTest } from '@/app/lib/api';
import toast from 'react-hot-toast';

export default function PhonePlatformAccount({
  platform,
  showLoadingIndicator,
  onConnectComplete,
}: {
  platform: 'incruit' | 'jobkorea' | 'wanted' | 'remember';
  showLoadingIndicator: Dispatch<SetStateAction<boolean>>;
  onConnectComplete: (platform: 'incruit' | 'jobkorea' | 'wanted' | 'remember') => void;
}) {
  const [currentConnectStep, setCurrentConnectStep] = useState(1);
  const { user } = getUserAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRequestAuthCode = async () => {
    showLoadingIndicator(true);

    try {
      // 1. requestID 생성 요청.
      const requestId = await getRequestId(platform);
      localStorage.setItem('rq', requestId);

      // 2. 계정 생성 프로세스 시작 trigger
      let res1;
      // ⭐️ TODO: 데스크탑 앱 출시되면 무조건 일렉트론 쪽으로 요청 보내기
      // (웹에서는 동기화 못함)
      // If it's a desktop app, execute the signup script
      if (typeof window !== 'undefined' && window.isDesktopApp) {
        console.log('🖥️ desktop app');
        res1 = await connectPlatformByDesktop(platform, requestId);
      } else {
        console.log('web');
        res1 = await connectPlatform(platform, requestId);
      }

      if (res1.status === 'timeout') {
        throw new Error('시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.');
      }
      if (res1.status === 'error') {
        throw new Error('계정 생성 중 오류가 발생했습니다. 카카오톡 채널로 문의해 주세요.');
      }

      // 3. 인증 코드 발송 결과 체크
      const res2 = await getAuthCodeStatusTest(requestId);
      const { status } = res2;

      if (status === 'code_sent') {
        setCurrentConnectStep(2);
        toast.success('핸드폰으로 인증 코드가 발송되었습니다.');
      } else if (status === 'completed') {
        toast.error('해당 플랫폼에 이미 계정이 있습니다.');
      } else if (status === 'finished' || status === 'failed') {
        // status가 finished, failed
        toast.error(`유효하지 않은 요청입니다. (${status})`);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'User is not authenticated') {
          console.error('User is not logged in');
          toast.error('유효하지 않은 유저입니다. 다시 로그인해 주세요.');
        } else if (
          error.message === '최대 재시도 횟수를 초과했습니다.' ||
          error.message === '25초를 초과했습니다.' ||
          error.message === '시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.' ||
          error.message === '계정 생성 중 오류가 발생했습니다. 카카오톡 채널로 문의해 주세요.'
        ) {
          //
          // 어떻게 처리할까?
          // onNextPlatform(); 그냥 넘어갈까?
          toast.error(error.message);
        } else {
          console.error('Failed:', error.message);
          toast.error(`플랫폼에 계정 생성 중 오류가 발생했습니다. (${error.message})`);
        }
      }
    }

    showLoadingIndicator(false);
  };

  const handleConnect = async () => {
    const verifyCode = inputRef.current?.value;
    if (!verifyCode || !verifyCode.trim() || verifyCode.trim() === '') {
      alert('인증 코드를 입력하세요');
      return;
    }

    showLoadingIndicator(true);

    try {
      const requestId = localStorage.getItem('rq') || '';
      //  db에 인증 코드 저장
      await submitAuthCode(requestId, verifyCode);

      // 모달 닫고 sse 트리거
      onConnectComplete(platform);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`인증 코드를 저장하는 도중 에러가 발생했습니다. ${error.message}`);
      }
    }

    showLoadingIndicator(false);
  };

  return (
    <>
      {currentConnectStep === 1 ? (
        <>
          <PlatformTerms currentPlatform={platform} />
          <div className="flex items-center justify-center">
            <PlatformConnectButton onClickConnect={handleRequestAuthCode} />
          </div>
        </>
      ) : (
        <div className="">
          <div className="mb-1 text-sm">
            {user ? `${user?.telNo}으로 발송된 ` : ''}인증 코드를 입력해 주세요.
          </div>
          <div className="mb-2 flex flex-col space-y-2">
            <input
              ref={inputRef}
              id="auth-code"
              type="text"
              inputMode="numeric"
              placeholder="문자로 전송된 인증 코드를 입력하세요."
              autoComplete="off"
              className="rounded-md border border-gray-500 bg-gray-700 p-2 text-white"
            />
          </div>
          <div className="text-sm text-gray-300">발송된 인증 코드는 3분 동안 유효해요.</div>
          <div className="flex items-center justify-center">
            <button
              className="btn-elevate mt-10 rounded-full border border-primary px-4 py-2 text-sm"
              onClick={handleConnect}
            >
              계정 생성하기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
