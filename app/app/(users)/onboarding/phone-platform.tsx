import { HrPlatformName } from '@/app/lib/constants';
import { connectPhonePlatform, getAuthCodeStatus, getRequestId, submitAuthCode } from './actions';
import toast from 'react-hot-toast';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import PlatformTerms from './platform-terms';
import { getUserAuth } from '@/app/lib/client-auth';

export default function PhonePlatform({
  currentPlatform,
  onNextPlatform,
  showLoadingIndicator,
}: {
  currentPlatform: HrPlatformName;
  onNextPlatform: () => void;
  showLoadingIndicator: Dispatch<SetStateAction<boolean>>;
}) {
  console.log('PhonePlatform rendered, current platform: ', currentPlatform);

  const [currentConnectStep, setCurrentConnectStep] = useState(1);
  const [verifyCode, setVerifyCode] = useState('');
  const { user } = getUserAuth();

  // let requestId = localStorage.getItem('rq');

  const handleVerifyCode = (e: ChangeEvent<HTMLInputElement>) => {
    const verifyCode = e.target.value;
    setVerifyCode(verifyCode);
  };

  const renderComponent = () => {
    switch (currentConnectStep) {
      case 1:
        return (
          <div>
            <p>약관 동의</p>
            <PlatformTerms currentPlatform={currentPlatform} />

            <button
              className="mt-2 rounded-full border border-primary px-4 py-2 text-sm"
              onClick={async () => {
                // 인증 코드 요청
                showLoadingIndicator(true);

                try {
                  // 1. requestID 생성 요청
                  const requestId = await getRequestId(currentPlatform);

                  localStorage.setItem('rq', requestId);

                  // 2. 계정 생성 프로세스 시작 trigger
                  await connectPhonePlatform(requestId, currentPlatform);

                  // 3. 인증 코드 발송 결과 체크
                  const { status } = await getAuthCodeStatus(requestId);

                  console.log('status: ', status);
                  //   console.log('TODO: status에 따라 다음 UI 보여주기');

                  // 4. UI 업데이트
                  if (status === 'code_sent') {
                    // 코드가 전송되었음
                    setCurrentConnectStep(2);
                    toast.success('핸드폰으로 인증 코드가 발송되었습니다.');
                  } else if (status === 'completed') {
                    // 이미 계정이 생성된 플랫폼
                    onNextPlatform();
                  } else {
                    toast.error('플랫폼에 계정 생성 중 오류가 발생했습니다. (1)');
                  }
                } catch (error) {
                  if (error instanceof Error) {
                    if (error.message === 'User is not authenticated') {
                      console.error('User is not logged in');
                      toast.error('유효하지 않은 유저입니다. 다시 로그인해 주세요.');
                    } else {
                      console.error('Failed:', error.message);
                      toast.error(`플랫폼에 계정 생성 중 오류가 발생했습니다. (${error.message})`);
                    }
                  }
                }

                showLoadingIndicator(false);
              }}
            >
              약관 동의 후 인증 코드 요청하기
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            <div>{user ? `${user?.telNo}으로 발송된 ` : ''}인증 코드를 입력해 주세요.</div>

            <div className="flex flex-col space-y-2">
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
            <div>
              <button className="text-sm text-gray-300">인증 코드 재전송</button>
            </div>

            <button
              className="mt-2 rounded-full border border-primary px-4 py-2 text-sm"
              onClick={async () => {
                // 인증 코드 입력 후 계정 생성 요청
                try {
                  const requestId = localStorage.getItem('rq') || '';
                  console.log('requestId from localStorage', requestId);

                  await submitAuthCode(requestId, verifyCode);

                  // input 비우기
                  setVerifyCode('');

                  // 다음 플랫폼
                  onNextPlatform();
                  setCurrentConnectStep(1);
                } catch (error) {
                  console.log('submitAuthCode > error: ', error);
                  toast.error('?');
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
