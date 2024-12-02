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
          <div>
            <p className="font-semibold">{item.schoolName}</p>
            <div className="font-semibold">
              <span>{item.major}</span>
              <span> - </span>
              <span>{item.educationLevel}</span>
            </div>
            <p>
              {item.startYear} - {item.endYear}
            </p>
            <p>{item.graduationStatus}</p>
          </div>
        </ResumeCardWrapper>
      ))}
  </div>
);

export default EducationCard;
