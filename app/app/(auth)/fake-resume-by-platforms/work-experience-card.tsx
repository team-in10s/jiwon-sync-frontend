import React from 'react';
import ResumeCardWrapper from './resume-card-wrapper';

type WorkExperienceProps = {
  data: {
    platform: string;
    isSelected: boolean;
    companyName: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    isCurrent: boolean;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
};

const WorkExperienceCard: React.FC<WorkExperienceProps> = ({ data, onClick }) => (
  <div className="mb-5 w-full">
    <div className="mb-1.5 text-lg font-semibold">경력</div>
    {data
      .filter((item) => item.isSelected)
      .map((item) => (
        <ResumeCardWrapper
          platform={item.platform}
          onClick={() => onClick(item)}
          key={item.platform}
        >
          <div className="flex items-center">
            <div className="mr-4 size-14 rounded-full bg-gray-200"></div>
            <div>
              <p className="font-bold">{item.position}</p>
              <p>{item.companyName}</p>
              <p>
                {item.startDate} - {item.endDate}
              </p>
              <p>{item.description}</p>
            </div>
          </div>
        </ResumeCardWrapper>
      ))}
  </div>
);

export default WorkExperienceCard;
