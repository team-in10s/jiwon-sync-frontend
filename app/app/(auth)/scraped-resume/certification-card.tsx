import React from 'react';
import ResumeCardWrapper from './resume-card-wrapper';
import { ResumeCertificate } from './types';

type CertificationProps = {
  data: ResumeCertificate[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
};

const CertificationCard: React.FC<CertificationProps> = ({ data, onClick }) => (
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
            <p className="font-semibold">{item.certificateName}</p>
            <p className="font-semibold">{item.issuer}</p>
            <p>
              {item.acquisitionYear}.{item.acquisitionMonth}
            </p>
          </div>
        </ResumeCardWrapper>
      ))}
  </div>
);

export default CertificationCard;
