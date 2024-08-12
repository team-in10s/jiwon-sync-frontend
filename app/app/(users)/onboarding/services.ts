// app/app/(users)/onboarding/services.ts

import { ResumeData } from './types';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://jiwon-sync.in10s.co/api/resume/main'
    : 'http://localhost:8000/api/resume/main';

export async function uploadResumeService(resumeData: ResumeData) {
  const formData = new FormData();

  if (resumeData.url) {
    formData.append('url', resumeData.url);
  }

  if (resumeData.file) {
    formData.append('file', resumeData.file);
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Resume upload failed');
  }

  return await response.json();
}
