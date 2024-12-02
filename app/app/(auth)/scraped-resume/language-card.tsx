import React from 'react';
import ResumeCardWrapper from './resume-card-wrapper';
import { ResumeLanguage } from './types';

type LanguageProps = {
  data: ResumeLanguage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
};

const LanguageCard: React.FC<LanguageProps> = ({ data, onClick }) => (
  <div className="mb-5 w-full">
    <div className="mb-1.5 text-lg font-semibold">언어</div>
    {data
      .filter((item) => item.isSelected)
      .map((item) => (
        <ResumeCardWrapper
          platform={item.platform}
          onClick={() => onClick(item)}
          key={item.platform}
        >
          <div className="flex items-center">
            <div className="mr-4 size-14 rounded-full bg-gray-200">{item.language}</div>
            <div>
              <p className="font-bold">{item.testName}</p>
              <p>{item.speakingLevel}</p>
              <p>{item.score}</p>
            </div>
          </div>
        </ResumeCardWrapper>
      ))}
  </div>
);

export default LanguageCard;
