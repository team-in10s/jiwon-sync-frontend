import React from 'react';
import clsx from 'clsx';

type ResumeCardWrapperProps = {
  platform: string;
  children: React.ReactNode;
  onClick: () => void;
};

const ResumeCardWrapper: React.FC<ResumeCardWrapperProps> = ({ platform, children, onClick }) => {
  return (
    <div
      className={clsx('flex flex-col overflow-hidden rounded-lg border', `border-${platform}`)}
      onClick={onClick}
    >
      <div className={clsx('py-1 text-center text-white', `bg-${platform}`)}>
        {platform}에서 가져왔어요
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default ResumeCardWrapper;
