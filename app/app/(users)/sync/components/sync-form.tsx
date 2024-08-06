'use client';

import { useState } from 'react';
import { PLATFORM_CONFIG } from '@/app/lib/constants';
import PlatformSelect from './platform-select';
import JiwonPlatform from './jiwon-platform';
import UserCustom from './user-custom';
import OtherPlatform from './other-platform';

// TODO: constant로 옮길 수 있을듯?
const options = Object.keys(PLATFORM_CONFIG).map((platform) => {
  return {
    value: platform,
    label: PLATFORM_CONFIG[platform].displayName,
    imageSrc: PLATFORM_CONFIG[platform].logo
      ? `/assets/platform_logo/${PLATFORM_CONFIG[platform].logo}`
      : null,
  };
});

export default function SyncForm() {
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const handleChange = (value: string) => {
    setSelectedPlatform(value);
  };

  return (
    <div>
      <h2>기존 이력서 불러오기</h2>
      <p>가장 마지막에 업로드한 이력서가 우측 채용 플랫폼들에 자동으로 동기화 됩니다.</p>

      <PlatformSelect options={options} selectedValue={selectedPlatform} onChange={handleChange} />
      {selectedPlatform === '' ? null : <ResumeInputs selectedPlatform={selectedPlatform} />}

      {/* {isLoading && <FullScreenLoadingIndicator />} */}
    </div>
  );
}

function ResumeInputs({ selectedPlatform }: { selectedPlatform: string }) {
  switch (selectedPlatform) {
    case 'jiwon':
      return <JiwonPlatform />;
    case 'custom':
      return <UserCustom />;
    default:
      return <OtherPlatform selectedPlatform={selectedPlatform} />;
  }
}
