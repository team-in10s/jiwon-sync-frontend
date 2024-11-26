'use client';

import ResumeContainer from './resume-container';
import { MessageChannelProvider } from 'jiwon-message-channel';

export default function Page() {
  return (
    <div className="relative mx-auto flex w-full max-w-md flex-col items-center p-4 text-gray-02">
      <MessageChannelProvider>
        <ResumeContainer />
      </MessageChannelProvider>
    </div>
  );
}
