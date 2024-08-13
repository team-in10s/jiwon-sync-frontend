// app/app/(users)/onboarding/actions.ts

'use server';

import { uploadResumeUseCase } from './use-cases';
import { redirect } from 'next/navigation';
import { ResumeData } from './types';

export async function uploadResumeAction(resumeData: ResumeData) {
  try {
    await uploadResumeUseCase(resumeData);
    // Redirect to the next step or dashboard after successful upload
    redirectResumeAction();
  } catch (error) {
    // Handle error
    console.error('Resume upload failed:', error);
    // You might want to return an error message that can be displayed to the user
    return { error: 'Resume upload failed. Please try again.' };
  }
}

export async function redirectResumeAction() {
  redirect('/app/resume');
}
