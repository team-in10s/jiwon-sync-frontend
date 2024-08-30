import { HrPlatformName } from '@/app/lib/constants';
import { getRequestId, submitAuthCode } from './actions';
import toast from 'react-hot-toast';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import PlatformTerms from './platform-terms';
import { getUserAuth } from '@/app/lib/client-auth';
import { connectPlatform, connectPlatformByDesktop, getAuthCodeStatusTest } from '@/app/lib/api';
import PlatformConnectButton from './platform-connect-button';

export default function PhonePlatform({
  currentPlatform,
  onNextPlatform,
  showLoadingIndicator,
  onPrevious,
}: {
  currentPlatform: HrPlatformName;
  onNextPlatform: () => void;
  showLoadingIndicator: Dispatch<SetStateAction<boolean>>;
  onPrevious: () => void;
}) {
  const [currentConnectStep, setCurrentConnectStep] = useState(1);
  const [verifyCode, setVerifyCode] = useState('');
  const { user } = getUserAuth();
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerRunning, timeLeft]);

  const handleVerifyCode = (e: ChangeEvent<HTMLInputElement>) => {
    const verifyCode = e.target.value;
    setVerifyCode(verifyCode);
  };

  const startTimer = () => {
    setTimeLeft(180);
    setIsTimerRunning(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleRequestAuthCode = async () => {
    // 인증 코드 요청
    showLoadingIndicator(true);

    try {
      // 1. requestID 생성 요청
      console.log('1. requestID 생성 요청');
      const requestId = await getRequestId(currentPlatform);
      localStorage.setItem('rq', requestId);

      console.log('2. 계정 생성 프로세스 시작');
      // ⭐️ TODO: 데스크탑 앱 출시되면 무조건 일렉트론 쪽으로 요청 보내기
      // (웹에서는 동기화 못함)
      let res1;
      if (typeof window !== 'undefined' && window.isDesktopApp) {
        console.log('🖥️ desktop app');
        res1 = await connectPlatformByDesktop(currentPlatform, requestId);
      } else {
        res1 = await connectPlatform(currentPlatform, requestId);
      }
      console.log('-- ', res1);

      if (res1.status === 'timeout') {
        // 다음 플랫폼으로 넘기기
      } else if (res1.status === 'error') {
        // 다음 플랫폼으로 넘기기
      } else {
        // Handle successful result
        console.log('Connection successful:', res1);
      }

      // 3. 인증 코드 발송 결과 체크
      console.log('3. 인증 코드 발송 결과 체크');

      const res2 = await getAuthCodeStatusTest(requestId);
      console.log('-- ', res2);
      const { status } = res2;

      // // 4. UI 업데이트
      if (status === 'code_sent') {
        // 코드가 전송되었음
        setCurrentConnectStep(2);
        startTimer(); // Start the timer
        toast.success('핸드폰으로 인증 코드가 발송되었습니다.');
      } else if (status === 'completed') {
        // 이미 계정이 생성된 플랫폼
        onNextPlatform();
      } else {
        // "requested”, “finished”, “failed”
        // 다음 플랫폼으로 이동
        onNextPlatform();
      }
    } catch (error) {
      console.error('Error in handleRequestAuthCode:', error);

      if (error instanceof Error) {
        if (error.message === 'User is not authenticated') {
          console.error('User is not logged in');
          toast.error('유효하지 않은 유저입니다. 다시 로그인해 주세요.');
        } else if (error.message === '최대 재시도 횟수를 초과했습니다.') {
          //
          // 어떻게 처리할까?
          // onNextPlatform(); 그냥 넘어갈까?
          toast.error(error.message);
        } else if (error.message === '25초를 초과했습니다.') {
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

  const renderComponent = () => {
    switch (currentConnectStep) {
      case 1:
        return (
          <div>
            <PlatformTerms currentPlatform={currentPlatform} />

            <div className="mt-12 flex items-center justify-between">
              <button onClick={onPrevious} className="text-sm text-blue-500 hover:underline">
                이전 단계로
              </button>

              <PlatformConnectButton onClickConnect={handleRequestAuthCode} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="mt-5">
            <div className="mb-1 text-sm">
              {user ? `${user?.telNo}으로 발송된 ` : ''}인증 코드를 입력해 주세요.
            </div>

            <div className="mb-2 flex flex-col space-y-2">
              <input
                id="auth-code"
                type="text"
                inputMode="numeric"
                value={verifyCode}
                onChange={handleVerifyCode}
                placeholder="문자로 전송된 인증 코드를 입력하세요."
                className={`rounded-md border border-gray-500 bg-gray-700 p-2 text-white`}
              />
            </div>
            <div className="text-sm text-gray-300">
              {timeLeft > 0 ? (
                <p>발송된 인증 코드는 {formatTime(timeLeft)} 동안 유효해요.</p>
              ) : (
                <p className="text-red-500">인증 시간이 만료되었습니다.</p>
              )}
            </div>

            <button
              className="mt-10 w-full rounded-full border border-primary px-4 py-2 text-sm"
              onClick={async () => {
                if (!verifyCode.trim() || verifyCode.trim() === '') {
                  alert('인증 코드를 입력하세요');
                  return;
                }

                // 인증 코드 입력 후 계정 생성 요청
                try {
                  const requestId = localStorage.getItem('rq') || '';

                  // db에 인증 코드 저장
                  await submitAuthCode(requestId, verifyCode);

                  // input 비우기
                  setVerifyCode('');

                  // 다음 플랫폼
                  onNextPlatform();
                  setCurrentConnectStep(1);
                } catch (error) {
                  if (error instanceof Error) {
                    toast.error(`인증 코드를 저장하는 도중 에러가 발생했습니다. ${error.message}`);
                  }
                }
              }}
            >
              계정 생성하기
            </button>
          </div>
        );

      default:
        break;
    }
  };

  return <div>{renderComponent()}</div>;
}
