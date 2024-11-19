import { ReactNode } from 'react';

export default function RecruitmentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto">
      <div className="w-full text-center">
        <h1 className="text-gradient mb-8 text-3xl font-bold">스카우트 제안</h1>
      </div>
      {children}
    </div>
  );
}
