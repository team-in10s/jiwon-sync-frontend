import React from 'react';
import ResumeCardWrapper from './resume-card-wrapper';
import { ResumeExperience } from './types';

type WorkExperienceProps = {
  data: ResumeExperience[];

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
              <p className="font-bold">{item.jobTitle}</p>
              <p>{item.companyName}</p>
              <p>{item.companySize}</p>
              <p>{item.companyType}</p>
              <p>{item.department}</p>
              <p>{item.industryType}</p>
              <p>{item.isCurrent}</p>
              <p>{item.salary}</p>
              <p>{item.workType}</p>
              <p>
                {item.startYear}/{item.startMonth} - {item.endYear}/{item.endMonth}
              </p>
              <p>{item.responsibilities}</p>
            </div>
          </div>
        </ResumeCardWrapper>
      ))}
  </div>
);

export default WorkExperienceCard;
