import React from 'react';
import ResumeCardWrapper from './resume-card-wrapper';

type ProfileProps = {
  data: {
    platform: string;
    isSelected: boolean;
    name: string;
    email: string;
    avatar: string;
    phone: string;
    birthday: string;
    gender: string;
    address: string;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
};

const ProfileCard: React.FC<ProfileProps> = ({ data, onClick }) => (
  <>
    {data
      .filter((item) => item.isSelected)
      .map((item) => (
        <ResumeCardWrapper
          platform={item.platform}
          borderColor="border-yellow-500"
          onClick={() => onClick(item)}
          key={item.platform}
        >
          <div className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.avatar} alt="Avatar" className="mr-4 size-14 rounded-full" />
            <div>
              <p className="font-bold">{item.name}</p>
              <p>{item.email}</p>
              <p>{item.phone}</p>
              <p>{item.birthday}</p>
              <p>{item.gender}</p>
              <p>{item.address}</p>
            </div>
          </div>
        </ResumeCardWrapper>
      ))}
  </>
);

export default ProfileCard;
