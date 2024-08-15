// app/app/(users)/onboarding/types.ts

export type ResumeData = {
  url?: string;
  file?: File;
};

export type PlatformInfo = {
  id: string;
  name: string;
  authType: 'email' | 'phone';
  termsAgreed: boolean;
  status: 'pending' | 'inProgress' | 'completed' | 'failed';
};
