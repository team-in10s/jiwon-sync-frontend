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
          <div>
            <p className="font-semibold">{item.language}</p>
            <div>
              <span>{item.testName}</span>
              <span> - </span>
              <span>{item.score}</span>
            </div>
            <p>{item.speakingLevel}</p>
          </div>
        </ResumeCardWrapper>
      ))}
  </div>
);

export default LanguageCard;
