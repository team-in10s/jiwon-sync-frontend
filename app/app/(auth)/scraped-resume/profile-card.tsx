import React from 'react';
import ResumeCardWrapper from './resume-card-wrapper';
import { ResumeProfile } from './types';

type ProfileProps = {
  data: ResumeProfile[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
};

const ProfileCard: React.FC<ProfileProps> = ({ data, onClick }) => (
  <div className="mb-5 w-full">
    <div className="mb-1.5 text-lg font-semibold">프로필</div>
    {Array.isArray(data) &&
      data
        .filter((item) => item.isSelected)
        .map((item) => (
          <ResumeCardWrapper
            key={item.platform}
            platform={item.platform}
            onClick={() => onClick(item)}
          >
            <div className="font-semibold">
              {/* <p>Title: {item.resumeTitle}</p> */}
              <p>이름: {item.name}</p>
              <p>전화번호: {item.phoneNumber}</p>
              <p>이메일: {item.email}</p>

              {/* <p>Experience: {item.totalExperienceYears} years</p> */}
            </div>
          </ResumeCardWrapper>
        ))}
  </div>
);

export default ProfileCard;
