import React from 'react';
import ResumeCardWrapper from './resume-card-wrapper';

type IntroductionProps = {
  data: {
    platform: string;
    isSelected: boolean;
    content: string;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
};

const IntroductionCard: React.FC<IntroductionProps> = ({ data, onClick }) => (
  <>
    {data
      .filter((item) => item.isSelected)
      .map((item) => (
        <ResumeCardWrapper
          platform={item.platform}
          onClick={() => onClick(item)}
          key={item.platform}
        >
          <p>{item.content}</p>
        </ResumeCardWrapper>
      ))}
  </>
);

export default IntroductionCard;
