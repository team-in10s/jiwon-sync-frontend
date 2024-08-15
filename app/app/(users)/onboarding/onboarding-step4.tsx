// app/app/(users)/onboarding/onboarding-step4.tsx

import { PLATFORM_CONFIG, HrPlatformName } from '@/app/lib/constants';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import FullScreenLoadingIndicator from '../../components/fullscreen-loading-indicator';
import { connectEmailPlatformAction, testRequestPhoneAuthCode, submitAuthCode } from './actions';
import toast from 'react-hot-toast';
import PlatformTerms from './platform-terms';

type Step4Props = {
  selectedPlatforms: HrPlatformName[];
  onNext: () => void;
  onPrevious: () => void;
};

export default function OnboardingStep4({ selectedPlatforms, onNext, onPrevious }: Step4Props) {
  const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);
  const [showsLoadingIndicator, setShowsLoadingIndicator] = useState(false);

  // 임시 주석 처리
  // const [completedPlatforms, setCompletedPlatforms] = useState<string[]>([]);
  // const handlePlatformCompletion = (platformId: string) => {
  //   setCompletedPlatforms((prev) =>
  //     prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId]
  //   );
  // };
  const sortedPlatforms = [...selectedPlatforms].sort((a, b) => {
    if (PLATFORM_CONFIG[a]?.authType === 'email' && PLATFORM_CONFIG[b]?.authType !== 'email') {
      return -1; // a comes before b
    } else if (
      PLATFORM_CONFIG[a]?.authType !== 'email' &&
      PLATFORM_CONFIG[b]?.authType === 'email'
    ) {
      return 1; // b comes before a
    }
    return 0; // no change in order
  });

  console.log('sortedPlatforms: ', sortedPlatforms);

  const currentPlatform = sortedPlatforms[currentPlatformIndex];
  const isLastPlatform = currentPlatformIndex === sortedPlatforms.length - 1;

  const handleNextPlatform = () => {
    if (isLastPlatform) {
      onNext();
    } else {
      setCurrentPlatformIndex(currentPlatformIndex + 1);
    }
  };

  const handleConnectPlaformEmailAuth = async () => {
    setShowsLoadingIndicator(true);

    try {
      const res = await connectEmailPlatformAction(currentPlatform);
      console.log('res! ', res); // 바로 리턴되는 response

      handleNextPlatform();
    } catch (error) {
      //
    }

    setShowsLoadingIndicator(false);
  };

  // const handleConnectPlaformPhoneAuth = async () => {
  //   setShowsLoadingIndicator(true);

  //   try {
  //     await requestPhoneAuthCode(currentPlatform);
  //   } catch (error) {
  //     //
  //   }

  //   setShowsLoadingIndicator(false);
  // };

  return (
    <>
      <div className="card w-full max-w-2xl p-8">
        <p className="mb-6 text-center text-2xl font-bold">
          채용 플랫폼에 계정을 순차적으로 만들고 있어요.
        </p>
        <p className="mb-10 text-center">필요한 약관 동의와, 전화번호 인증을 진행해주세요.</p>

        <div className="mb-8">
          <div className="mb-4 text-center text-xl font-bold">
            {PLATFORM_CONFIG[currentPlatform]?.displayName}에 계정을 생성합니다.
          </div>

          {PLATFORM_CONFIG[currentPlatform]?.authType === 'email' ? (
            <EmailPlatform
              currentPlatform={currentPlatform}
              onConnect={handleConnectPlaformEmailAuth}
            />
          ) : (
            <PhonePlatform
              showLoadingIndicator={setShowsLoadingIndicator}
              currentPlatform={currentPlatform}
              onNextPlatform={handleNextPlatform}
            />
          )}
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          {currentPlatformIndex + 1} / {sortedPlatforms.length}
        </div>

        <div className="flex justify-between">
          <button onClick={onPrevious} className="text-sm text-blue-600 hover:underline">
            이전 단계로
          </button>
          <button
            onClick={onNext}
            //   disabled={completedPlatforms.length !== selectedPlatforms.length} // 임시 주석처리

            className="btn-gradient rounded-full px-16 py-3 font-semibold disabled:opacity-50"
          >
            다음
          </button>
        </div>
      </div>
      {showsLoadingIndicator && <FullScreenLoadingIndicator />}
    </>
  );
}

function EmailPlatform({
  currentPlatform,
  onConnect,
}: {
  currentPlatform: HrPlatformName;
  onConnect: () => Promise<void>;
}) {
  console.log('EmailPlatform rendered');

  return (
    <div className="bg-slate-700/80 p-4">
      <p>약관 동의</p>
      <PlatformTerms currentPlatform={currentPlatform} />

      <button
        className="mt-2 rounded-full border border-primary px-4 py-2 text-sm"
        onClick={onConnect}
      >
        약관 동의 후 계정 생성 요청하기
      </button>
    </div>
  );
}

function PhonePlatform({
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
                  // const authCodeRes = await requestPhoneAuthCode(currentPlatform);
                  const authCodeRes = await testRequestPhoneAuthCode(currentPlatform);
                  console.log('authCodeRes? ', authCodeRes); // conntectedStatus? requestId ?

                  localStorage.setItem('rq', authCodeRes?.requestId);

                  setCurrentConnectStep(2);
                } catch (error) {
                  console.log('err >> ', error);
                  toast.error('플랫폼에 계정 생성 중 오류가 발생했습니다.');
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
            <div>인증 코드를 입력해 주세요.</div>

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

                  // 다음 플랫폼
                  onNextPlatform();
                } catch (error) {
                  console.log('submitAuthCode > error: ', error);
                  toast.error('?');
                }
              }}
            >
              계정 생성 요청하기
            </button>
          </div>
        );

      default:
        break;
    }
  };
  return <div>{renderComponent()}</div>;
}
