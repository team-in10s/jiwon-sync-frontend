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
  <div className="mb-5 w-full">
    <div className="mb-1.5 text-lg font-semibold">간단 소개</div>
    {data
      .filter((item) => item.isSelected)
      .map((item) => (
        <ResumeCardWrapper
          platform={item.platform}
          onClick={() => onClick(item)}
          key={item.platform}
        >
          {/* <p>{item.content}</p> */}
          {/* 임시. 값 확인용. */}
          <p>{data.toString()}</p>
        </ResumeCardWrapper>
      ))}
  </div>
);

export default IntroductionCard;
