import React from 'react';
import ResumeCardWrapper from './resume-card-wrapper';
import { ResumeEducation } from './types';

type EducationProps = {
  data: ResumeEducation[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
};

const EducationCard: React.FC<EducationProps> = ({ data, onClick }) => (
  <div className="mb-5 w-full">
    <div className="mb-1.5 text-lg font-semibold">학력</div>
    {data
      .filter((item) => item.isSelected)
      .map((item) => (
        <ResumeCardWrapper
          platform={item.platform}
          onClick={() => onClick(item)}
          key={item.platform}
        >
          <div className="flex items-center">
            <div className="mr-4 size-14 rounded-full bg-gray-200">{item.schoolName}</div>
            <div>
              <p className="font-bold">{item.schoolName}</p>
              <p>{item.major}</p>
              <p>
                {item.startYear} - {item.endYear}
              </p>
              <p>{item.educationLevel}</p>
              <p>{item.graduationStatus}</p>
            </div>
          </div>
        </ResumeCardWrapper>
      ))}
  </div>
);

export default EducationCard;
