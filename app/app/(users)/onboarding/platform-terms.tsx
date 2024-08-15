import { HrPlatformName, PLATFORM_TERMS } from '@/app/lib/constants';

export default function PlatformTerms({ currentPlatform }: { currentPlatform: HrPlatformName }) {
  return (
    <div>
      {PLATFORM_TERMS[currentPlatform]?.map((term) => {
        return (
          <div key={term.title}>
            <p>{term.title}</p>
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
