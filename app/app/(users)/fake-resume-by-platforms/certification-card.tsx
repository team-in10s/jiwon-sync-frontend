import React from 'react';
import ResumeCardWrapper from './resume-card-wrapper';

type CertificationProps = {
  data: {
    platform: string;
    isSelected: boolean;
    name: string;
    date: string;
    description: string;
    issuedBy: string;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
};

const CertificationCard: React.FC<CertificationProps> = ({ data, onClick }) => (
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
            <p>{item.issuedBy}</p>
            <p>{item.date}</p>
            <p>{item.description}</p>
          </div>
        </ResumeCardWrapper>
      ))}
  </>
);

export default CertificationCard;
