import React from 'react';
import ResumeCardWrapper from './resume-card-wrapper';

type EducationProps = {
  data: {
    platform: string;
    isSelected: boolean;
    schoolName: string;
    major: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
    isCurrent: boolean;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
};

const EducationCard: React.FC<EducationProps> = ({ data, onClick }) => (
  <>
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
              <p className="font-bold">{item.schoolName}</p>
              <p>
                {item.major} | {item.degree}
              </p>
              <p>
                {item.startDate} - {item.endDate}
              </p>
              <p>{item.description}</p>
            </div>
          </div>
        </ResumeCardWrapper>
      ))}
  </>
);

export default EducationCard;
