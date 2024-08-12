// app/app/(users)/onboarding/use-cases.ts

/* eslint-disable */ // 임시..
import { uploadResumeService } from './services';
import { ResumeData } from './types';

export async function uploadResumeUseCase(resumeData: ResumeData) {
  try {
    const result = await uploadResumeService(resumeData);
    return result;
  } catch (error) {
    // Handle or throw error as needed
    throw error;
  }
}
