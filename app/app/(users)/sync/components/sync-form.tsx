'use client';

import { useState } from 'react';
import { PLATFORM_CONFIG, PlatformName } from '@/app/lib/constants';
import PlatformSelect from './platform-select';
import JiwonPlatform from './jiwon-platform';
import UserCustom from './user-custom';
import OtherPlatform from './other-platform';

// TODO: constant로 옮길 수 있을듯?
const options = Object.keys(PLATFORM_CONFIG).map((platform) => {
  const hrPlatform = platform as PlatformName;
  return {
    platform: hrPlatform,
    displayName: PLATFORM_CONFIG[hrPlatform]?.displayName,
    imageSrc: PLATFORM_CONFIG[hrPlatform]?.logo
      ? `/assets/platform_logo/${PLATFORM_CONFIG[hrPlatform]?.logo}`
      : null,
  };
});

export default function SyncForm() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformName>('jiwon');

  const handleChange = (value: PlatformName) => {
    setSelectedPlatform(value);
  };

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">기존 이력서 불러오기</h2>
      <p className="mb-6">
        가장 마지막에 업로드한 이력서가 우측 채용 플랫폼들에 자동으로 동기화 됩니다.
      </p>

      <div className="mb-4">
        <PlatformSelect
          options={options}
          selectedValue={selectedPlatform}
          onChange={handleChange}
        />
      </div>

      {selectedPlatform && <ResumeInputs selectedPlatform={selectedPlatform} />}
    </div>
  );
}

function ResumeInputs({ selectedPlatform }: { selectedPlatform: PlatformName }) {
  switch (selectedPlatform) {
    case 'jiwon':
      return <JiwonPlatform />;
    case 'custom':
      return <UserCustom />;
    default:
      return <OtherPlatform selectedPlatform={selectedPlatform} />;
  }
}
