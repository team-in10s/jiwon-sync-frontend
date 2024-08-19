import { HrPlatformName, PLATFORM_TERMS } from '@/app/lib/constants';

export default function PlatformTerms({ currentPlatform }: { currentPlatform: HrPlatformName }) {
  return (
    <div className="mb-3 rounded-lg bg-gray-400/20 p-3 text-sm">
      <p className="mb-2">약관 동의</p>
      {PLATFORM_TERMS[currentPlatform]?.map((term) => {
        return (
          <div key={term.title} className="mb-1">
            <span>{term.title}</span>
            {term.url && (
              <span className="ml-1 text-sm text-blue-500 underline">
                <a href={term.url} target="_blank" rel="noreferrer">
                  보기
                </a>
              </span>
            )}
          </div>
        );
      })}
      {PLATFORM_TERMS['jiwon']?.map((term) => {
        return (
          <div key={term.title}>
            <p>{term.title}</p>
          </div>
        );
      })}
    </div>
  );
}
