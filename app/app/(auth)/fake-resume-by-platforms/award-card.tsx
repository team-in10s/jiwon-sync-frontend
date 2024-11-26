import React from 'react';
import ResumeCardWrapper from './resume-card-wrapper';

type AwardProps = {
  data: {
    platform: string;
    isSelected: boolean;
    name: string;
    date: string;
    description: string;
    awardedBy: string;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
};

const AwardCard: React.FC<AwardProps> = ({ data, onClick }) => (
  <div className="mb-1.5">
    {data
      .filter((item) => item.isSelected)
      .map((item) => (
        <ResumeCardWrapper
          platform={item.platform}
          onClick={() => onClick(item)}
          key={item.platform}
        >
          <div>
            <p className="font-bold">{item.name}</p>
            <p>{item.awardedBy}</p>
            <p>{item.date}</p>
            <p>{item.description}</p>
          </div>
        </ResumeCardWrapper>
      ))}
  </div>
);

export default AwardCard;
