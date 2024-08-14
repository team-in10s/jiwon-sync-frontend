// app/app/(users)/onboarding/onboarding-step4.tsx

import { PLATFORM_CONFIG, HrPlatformName, PLATFORM_TERMS } from '@/app/lib/constants';
import { useState } from 'react';
import FullScreenLoadingIndicator from '../../components/fullscreen-loading-indicator';
import { connectEmailPlatformAction } from './actions';

type Step4Props = {
  selectedPlatforms: HrPlatformName[];
  onNext: () => void;
  onPrevious: () => void;
};

export default function OnboardingStep4({ selectedPlatforms, onNext, onPrevious }: Step4Props) {
  const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);
  const [showsLoadingIndicator, setShowsLoadingIndicator] = useState(false);

  console.log(selectedPlatforms);
  // 임시 주석 처리
  //   const [completedPlatforms, setCompletedPlatforms] = useState<string[]>([]);

  //   const handlePlatformCompletion = (platformId: string) => {
  //     setCompletedPlatforms((prev) =>
  //       prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId]
  //     );
  //   };
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

  const currentPlatform = sortedPlatforms[currentPlatformIndex];
  const isLastPlatform = currentPlatformIndex === sortedPlatforms.length - 1;

  const handleNextPlatform = () => {
    if (isLastPlatform) {
      onNext();
    } else {
      setCurrentPlatformIndex(currentPlatformIndex + 1);
    }
  };

  const handleConnect = async () => {
    console.log('handleConnect 호출: 현재 플랫폼', currentPlatform);

    // 이메일 인증 플랫폼
    if (PLATFORM_CONFIG[currentPlatform]?.authType === 'email') {
      try {
        setShowsLoadingIndicator(true);
        const res = await connectEmailPlatformAction(currentPlatform);
        console.log('res! ', res);

        handleNextPlatform();
      } catch (error) {
        //
      }
      setShowsLoadingIndicator(false);

      return;
    }
  };

  return (
    <>
      <div className="card w-full max-w-2xl p-8">
        <p className="mb-6 text-center text-2xl font-bold">
          채용 플랫폼에 계정을 순차적으로 만들고 있어요.
        </p>
        <p className="mb-4 text-center">필요한 약관 동의와, 전화번호 인증을 진행해주세요.</p>

        <div className="mb-8">
          <div className="mb-8 bg-blue-800/40 p-4">
            <p>선택하신 플랫폼:</p>
            {sortedPlatforms.map((platformId) => (
              <div key={platformId}>
                {PLATFORM_CONFIG[platformId]?.displayName} - {PLATFORM_CONFIG[platformId]?.authType}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="mb-4 text-center text-xl font-bold">
            {PLATFORM_CONFIG[currentPlatform]?.displayName} 계정 생성 중
          </div>
          <div className="text-center">
            인증 방식: {PLATFORM_CONFIG[currentPlatform]?.authType || '없음'}
          </div>

          {PLATFORM_CONFIG[currentPlatform]?.authType === 'email' ? (
            <EmailPlatform currentPlatform={currentPlatform} onConnect={handleConnect} />
          ) : (
            <PhonePlatform currentPlatform={currentPlatform} onConnect={handleConnect} />
          )}
        </div>

        {/* <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="text-sm text-blue-600 hover:underline"
          disabled={currentPlatformIndex === 0}
        >
          이전 단계로
        </button>
        <button
          onClick={handleNextPlatform}
          className="btn-gradient rounded-full px-16 py-3 font-semibold"
        >
          {isLastPlatform ? '완료' : '다음'}
        </button>
      </div> */}

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
  return (
    <div>
      {PLATFORM_TERMS[currentPlatform]?.map((term) => {
        return (
          <div key={term.title}>
            <p>약관 동의</p>
            <div>
              <p>{term.title}</p>
            </div>
          </div>
        );
      })}

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
  onConnect,
}: {
  currentPlatform: HrPlatformName;
  onConnect: () => Promise<void>;
}) {
  // TODO: 핸드폰 인증 컴포넌트는 자체 step 관리하는 status 필요

  // 1: 약관 동의 UI + 인증 코드 요청 UI
  // 2: 인증 코드 입력 UI
  // 3:
  // ?
  const [currentConnectStep, setCurrentConnectStep] = useState(1);

  const renderComponent = () => {
    switch (currentConnectStep) {
      case 1:
        return (
          <div>
            {PLATFORM_TERMS[currentPlatform]?.map((term) => {
              return (
                <>
                  <p>약관 동의</p>
                  <div key={term.title}>
                    <p>{term.title}</p>
                  </div>
                </>
              );
            })}
            <button
              className="mt-2 rounded-full border border-primary px-4 py-2 text-sm"
              onClick={() => {
                // 인증 코드 요청하는 action 호출
                onConnect();
                // 로딩 인디케이터
                // 응답 받으면 다음 step으로 ㄱㄱ
                setCurrentConnectStep(2);
              }}
            >
              약관 동의 후 인증 코드 요청하기
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            <div>핸드폰 인증 플랫폼 연결 2단계</div>
          </div>
        );

      default:
        break;
    }
  };
  return <div>{renderComponent()}</div>;
}
