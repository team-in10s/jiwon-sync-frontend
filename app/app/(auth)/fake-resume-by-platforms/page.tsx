'use client';

import { useState } from 'react';
import EducationCard from './education-card';
import IntroductionCard from './introduction-card';
import ProfileCard from './profile-card';
import CertificationCard from './certification-card';
import AwardCard from './award-card';
import CourseCard from './course-card';
import WorkExperienceCard from './work-experience-card';
import {
  fakeAwardData,
  fakeWorkExperienceData,
  fakeCertificationData,
  fakeCoursesData,
  fakeEducationData,
  fakeSelfIntroductionData,
  fakeProfileData,
} from '@/app/view-model-draft';
// import { MessageChannelProvider } from 'jiwon-message-channel';

export default function FakeResumeByPlatformsPage() {
  const [selectedData, setSelectedData] = useState(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openBottomSheet = (data: any) => {
    console.log('data? ', data);
    setSelectedData(data);
    setBottomSheetVisible(true);
  };

  const completeAction = () => {
    setOverlayVisible(false);
  };

  return (
    <div className="relative mx-auto flex w-full max-w-md flex-col items-center p-4">
      {isOverlayVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="text-white">Loading...</div>
        </div>
      )}

      <div>{selectedData ? 'selectedData' : 'not selectedData'}</div>
      <button onClick={completeAction}>test</button>

      <h1 className="mx-auto mb-4 w-full max-w-md text-2xl font-bold">이력서 정보를 가져왔어요!</h1>
      <p className="mx-auto mb-4 w-full max-w-md">
        이력서 내용이 문제가 없는지 검토해보세요. 현재 단계에서 추가 및 삭제는 불가능해요. 카드를
        클릭하면 수정이 가능해요.
      </p>

      <ProfileCard data={fakeProfileData} onClick={openBottomSheet} />
      <IntroductionCard data={fakeSelfIntroductionData} onClick={openBottomSheet} />
      <WorkExperienceCard data={fakeWorkExperienceData} onClick={openBottomSheet} />
      <EducationCard data={fakeEducationData} onClick={openBottomSheet} />
      <CertificationCard data={fakeCertificationData} onClick={openBottomSheet} />
      <AwardCard data={fakeAwardData} onClick={openBottomSheet} />
      <CourseCard data={fakeCoursesData} onClick={openBottomSheet} />

      {isBottomSheetVisible && (
        <div className="bottom-sheet">
          {/* Bottom sheet content goes here */}

          <button onClick={() => setBottomSheetVisible(false)}>Close</button>
        </div>
      )}
    </div>
  );
}
