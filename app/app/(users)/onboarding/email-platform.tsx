import { HrPlatformName } from '@/app/lib/constants';
import PlatformTerms from './platform-terms';

export default function EmailPlatform({
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
        약관 동의 후 계정 생성하기
      </button>
    </div>
  );
}
