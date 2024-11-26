import React from 'react';
import ResumeCardWrapper from './resume-card-wrapper';

type CourseProps = {
  data: {
    platform: string;
    isSelected: boolean;
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    organization: string;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
};

const CourseCard: React.FC<CourseProps> = ({ data, onClick }) => (
  <>
    {data
      .filter((item) => item.isSelected)
      .map((item) => (
        <ResumeCardWrapper
          platform={item.platform}
          borderColor="border-green-500"
          onClick={() => onClick(item)}
          key={item.platform}
        >
          <div>
            <p className="font-bold">{item.name}</p>
            <p>{item.organization}</p>
            <p>
              {item.startDate} - {item.endDate}
            </p>
            <p>{item.description}</p>
          </div>
        </ResumeCardWrapper>
      ))}
  </>
);

export default CourseCard;
