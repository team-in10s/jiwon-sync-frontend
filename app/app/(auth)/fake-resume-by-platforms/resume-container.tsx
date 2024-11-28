import { useState } from 'react';
import EducationCard from './education-card';
import IntroductionCard from './introduction-card';
import ProfileCard from './profile-card';
import CertificationCard from './certification-card';
import AwardCard from './award-card';
import CourseCard from './course-card';
import WorkExperienceCard from './work-experience-card';
// import {
//   fakeAwardData,
//   fakeWorkExperienceData,
//   fakeCertificationData,
//   fakeCoursesData,
//   fakeEducationData,
//   fakeSelfIntroductionData,
//   fakeProfileData,
// } from '@/app/view-model-draft';
import MessageChannel from 'jiwon-message-channel';
import { convertIIFEString } from '@/app/lib/utils';
import { mapToMergedFormat, scrapeResumeData } from './util';
import { ORIGINAL_LOGIN_JOB_ID, SCRAPE_RESUME_URL } from '../../(users)/constants';
// import { getPlatformStatusClient } from '@/app/lib/api';
import { PlatformStatusItem } from '../../(users)/account-status/types';

export default function ResumeContainer() {
  // NOTE: react native
  const postMessage = MessageChannel.usePostMessage();

  const [selectedData, setSelectedData] = useState(null);
  //   const [isOverlayVisible, setOverlayVisible] = useState(true);
  const [isScraping, setIsScraping] = useState(false);
  const [progress, setProgress] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [scrapeResults, setScrapeResults] = useState<any[]>([]); // Store results
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mergedData, setMergedData] = useState<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickCard = (data: any) => {
    console.log('data? ', data);
    setSelectedData(data);
    console.log('selectedData: ', selectedData);
  };

  //   const completeAction = () => {
  //     setOverlayVisible(false);
  //   };

  const handleScrapeResume = async () => {
    if (!MessageChannel.isEnabled()) return;

    alert('MessageChannel.isEnabled()');

    setIsScraping(true);
    setProgress(0);
    setScrapeResults([]); // Reset results

    try {
      //   const platforms = await getPlatformStatusClient();
      //   const completedPlatforms = platforms.filter((platform) => platform.status === 'completed');
      const completedPlatforms: PlatformStatusItem[] = [
        { platform: 'remember', status: 'completed' },
        { platform: 'wanted', status: 'completed' },
        { platform: 'saramin', status: 'completed' },
      ];

      for (const { platform } of completedPlatforms) {
        try {
          const result = await postMessage({
            isAsync: true,
            message: {
              taskId: ORIGINAL_LOGIN_JOB_ID[platform] || 100,
              type: 'executeScript',
              payload: {
                url: SCRAPE_RESUME_URL[platform]!,
                keepAlive: false,
                script: convertIIFEString(scrapeResumeData, SCRAPE_RESUME_URL[platform] || 'none'),
              },
            },
          });

          if (result.type === 'scrapResult' && result.payload.success) {
            alert('scrape result: ' + JSON.stringify(result));
            // const data = (result.payload as any).data;
            setScrapeResults((prevResults) => [...prevResults, result]);
          } else {
            alert(`Failed to scrape resume for platform: ${platform}`);
          }
        } catch (scrapeError) {
          alert(`Error scraping platform: ${platform}`);
        }

        // Update progress
        setProgress((prevProgress) => prevProgress + 1);
      }
    } catch (error) {
      // 4. Error handling
      if (!(error instanceof Error)) {
        // RES115: 추후 에러 위치 검색하기 위해 추가
        alert('예상하지 못한 에러가 발생했습니다.(RES115) 하단의 고객센터에 문의해 주세요.');
      }

      if (error instanceof Error && error.message.includes('get platform status failed')) {
        alert('연결된 플랫폼을 가져오는 도중 에러가 발생했습니다. 잠시 후에 다시 실행해 주세요.');
      } else {
        alert('플랫폼의 이력서를 가져오는 도중 에러가 발생했습니다. 잠시 후에 다시 실행해 주세요.');
      }
    } finally {
      setIsScraping(false);
    }

    alert('scrapeResults: ' + JSON.stringify(scrapeResults));

    const mergedData = mapToMergedFormat(scrapeResults);
    alert('mergedData: ' + JSON.stringify(mergedData));

    setMergedData(mergedData);
  };

  return (
    <>
      {/* {isOverlayVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="text-white">Loading...</div>
        </div>
      )} */}

      <h1 className="mx-auto mb-4 w-full max-w-md text-2xl font-bold">이력서 정보를 가져왔어요!</h1>
      <div className="mx-auto mb-4 w-full max-w-md">
        <p>이력서 내용이 문제가 없는지 검토해보세요.</p>
        <p>현재 단계에서 추가 및 삭제는 불가능해요.</p>
        <p>카드를 클릭하면 수정이 가능해요.</p>
      </div>

      <button onClick={handleScrapeResume}>get</button>
      <div>{isScraping ? `Scraping... (${progress})` : 'No scraping'}</div>

      {mergedData && (
        <>
          <ProfileCard data={mergedData.resume_profile} onClick={handleClickCard} />
          <IntroductionCard data={mergedData.resume_self_introduction} onClick={handleClickCard} />
          <WorkExperienceCard data={mergedData.resume_experiences} onClick={handleClickCard} />
          <EducationCard data={mergedData.resume_educations} onClick={handleClickCard} />
          <div className="w-full">
            <div className="mb-1.5 text-lg font-semibold">자격/수상/교육</div>
            <CertificationCard data={mergedData.resume_certificates} onClick={handleClickCard} />
            <AwardCard data={mergedData.resume_awards} onClick={handleClickCard} />
            <CourseCard data={mergedData.resume_courses} onClick={handleClickCard} />
          </div>
        </>
      )}
    </>
  );
}
