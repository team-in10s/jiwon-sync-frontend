import Image from 'next/image';
import { NUMBER_TO_KOREAN } from './util';

type ScrapingLoadingOverlayProps = {
  progress: number;
  currentPlatformName: string | null;
};

const ScrapingLoadingOverlay: React.FC<ScrapingLoadingOverlayProps> = ({
  progress,
  currentPlatformName,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
      <div className="0 flex flex-col items-center justify-center gap-10 text-center text-2xl font-semibold text-gray-02">
        <div>
          <span>{NUMBER_TO_KOREAN[progress] || '첫번째'} 이력서 가져오는 중</span>
          <div className="justify-cente ml-1 inline-flex items-center space-x-1 bg-white dark:invert">
            <div className="size-1 animate-bounce rounded-full bg-black [animation-delay:-0.3s]"></div>
            <div className="size-1 animate-bounce rounded-full bg-black [animation-delay:-0.15s]"></div>
            <div className="size-1 animate-bounce rounded-full bg-black"></div>
          </div>
        </div>

        {currentPlatformName && (
          <Image
            className="rounded-full"
            src={`/assets/platform_logo/${currentPlatformName}_logo.png`}
            alt="플랫폼 로고"
            width={100}
            height={100}
          />
        )}

        <p>최대한 빨리 가져올게요!</p>
      </div>
    </div>
  );
};

export default ScrapingLoadingOverlay;
