type Step1Props = {
  onNext: () => void;
};

export default function OnboardingStep1({ onNext }: Step1Props) {
  return (
    <div className="card w-full max-w-2xl p-8">
      {/* heading */}
      <p className="mb-6 text-center text-2xl font-bold">
        지원전에 커리어 매니저와 함께 <br /> 밀착 매니징 할 커리어 전용 신규 계정을 생성할게요.
      </p>
      {/* sub-heading */}
      <p className="mb-12 text-center text-lg">
        매니저가 이력서 자동 업데이트부터 - 스카우트 제안관리까지 <br /> 자동으로 관리해드려요.{' '}
      </p>

      {/* body content */}
      <div className="mb-12">
        <p>사용중이던 계정은 사라지지 않아요.</p>
        <p>커리어 전용 계정은 더 쉽게 로그인하고 통합 업데이트가 가능해요.</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        <button onClick={onNext} className="btn-gradient rounded-full px-10 py-2 font-semibold">
          1분 만에 커리어 계정 만들기
        </button>
        <button className="text-sm text-gray-400 underline underline-offset-2">
          기존 계정을 꼭 활용해야 하는 이유가 있어요
        </button>
      </div>
    </div>
  );
}
