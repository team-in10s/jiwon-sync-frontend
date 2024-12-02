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
          <div>
            <div className="mb-1.5 flex items-center">
              <div className="mr-4 size-14 rounded bg-gray-200"></div>
              <div>
                <p className="font-semibold">{item.jobTitle}</p>
                <p className="font-semibold">{item.companyName}</p>
                <p>{item.department}</p>
                <div>
                  <span>
                    {item.startYear}.{item.startMonth}
                  </span>
                  <span> - </span>
                  {item.isCurrent ? (
                    <span>재직 중</span>
                  ) : (
                    <span>
                      {item.endYear}.{item.endMonth}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* <p>{item.companySize}</p> */}
            {/* <p>{item.companyType}</p> */}
            {/* <p>{item.industryType}</p> */}
            {/* <p>{item.salary}</p> */}
            {/* <p>{item.workType}</p> */}

            <p>{item.responsibilities}</p>
          </div>
        </ResumeCardWrapper>
      ))}
  </div>
);

export default WorkExperienceCard;
