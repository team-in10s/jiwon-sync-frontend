import { useEffect, useState } from "react";
import EducationCard from "./education-card";
// import IntroductionCard from './introduction-card';
import ProfileCard from "./profile-card";
import CertificationCard from "./certification-card";
// import AwardCard from './award-card';
// import CourseCard from './course-card';
import WorkExperienceCard from "./work-experience-card";
import MessageChannel from "jiwon-message-channel";
import { convertIIFEString } from "@/app/lib/utils";
import { mapToMergedFormat, scrapeResumeData } from "./util";
import {
  ORIGINAL_LOGIN_JOB_ID,
  SCRAPE_RESUME_URL,
} from "../../(users)/constants";
import { MergedResumeData } from "./types";
import { getPlatformStatusClient } from "@/app/lib/api";
import { HrPlatformName } from "@/app/lib/constants";
import ScrapingLoadingOverlay from "./scraping-loading-overlay";
import LanguageCard from "./language-card";
import { PlatformStatusItem } from "@/app/app/(users)/account-status/types";
import {useRouter} from "next/navigation";
// import { PlatformStatusItem } from '../../(users)/account-status/types';

export default function ResumeContainer() {
  const postMessage = MessageChannel.usePostMessage();
  const [selectedData, setSelectedData] = useState(null);
  const [isScraping, setIsScraping] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mergedData, setMergedData] = useState<MergedResumeData | null>(null);
  const [currentPlatformName, setCurrentPlatformName] =
    useState<HrPlatformName | null>(null);
  const [completedPlatforms, setCompletedPlatforms] = useState<
    PlatformStatusItem[]
  >([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickCard = (data: any) => {
    setSelectedData(data);
  };

  const handleScrapeResume = async () => {
    if (!MessageChannel.isEnabled()) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scrapeResults: any[] = [];

    try {
      const platforms = await getPlatformStatusClient();

      const completedPlatforms = platforms.filter(
        (platform) => platform.status === "completed",
      );
      setCompletedPlatforms(completedPlatforms);
      // const completedPlatforms: PlatformStatusItem[] = [
      //   { platform: 'incruit', status: 'completed' },
      //   { platform: 'wanted', status: 'completed' },
      //   { platform: 'jobkorea', status: 'completed' },
      //   { platform: 'remember', status: 'completed' },
      // ];

      for (const { platform } of completedPlatforms) {
        try {
          // setCurrentPlatformName(completedPlatforms[progress]['platform']);
          setCurrentPlatformName(platform);

          const result = await postMessage({
            isAsync: true,
            message: {
              taskId: ORIGINAL_LOGIN_JOB_ID[platform] || 100,
              type: "executeScript",
              payload: {
                url: SCRAPE_RESUME_URL[platform]!,
                keepAlive: false,
                script: convertIIFEString(
                  scrapeResumeData,
                  SCRAPE_RESUME_URL[platform] || "none",
                ),
              },
            },
          });

          if (result.type === "scrapResult" && result.payload.success) {
            // const data = (result.payload as any).data;
            scrapeResults.push(result);
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
        alert(
          "예상하지 못한 에러가 발생했습니다.(RES115) 하단의 고객센터에 문의해 주세요.",
        );
      }

      if (
        error instanceof Error &&
        error.message.includes("get platform status failed")
      ) {
        alert(
          "연결된 플랫폼을 가져오는 도중 에러가 발생했습니다. 잠시 후에 다시 실행해 주세요.",
        );
      } else {
        alert(error);
        alert(
          "플랫폼의 이력서를 가져오는 도중 에러가 발생했습니다. 잠시 후에 다시 실행해 주세요.",
        );
      }
    } finally {
      const mergedData = mapToMergedFormat(scrapeResults);

      setMergedData(mergedData);
      setIsScraping(false);
    }
  };

  useEffect(() => {
    handleScrapeResume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isScraping && (
        <ScrapingLoadingOverlay
          progress={progress}
          currentPlatformName={currentPlatformName}
        />
      )}

      <h1 className="mx-auto mb-4 w-full max-w-md text-2xl font-bold">
        이력서 정보를 가져왔어요!
      </h1>
      <div className="mx-auto mb-4 w-full max-w-md">
        <p>이력서 내용이 문제가 없는지 검토해보세요.</p>
        <p>현재 단계에서 추가 및 삭제는 불가능해요.</p>
        <p>카드를 클릭하면 수정이 가능해요.</p>
      </div>

      {mergedData && (
        <>
          <ProfileCard
            data={mergedData.resumeProfile}
            onClick={handleClickCard}
            completedPlatforms={completedPlatforms}
          />
          {/* <IntroductionCard*/}
          {/*  data={mergedData.resume_self_introduction || []}*/}
          {/*  onClick={handleClickCard}*/}
          {/*/> */}

          <WorkExperienceCard
            data={mergedData.resumeExperiences}
            onClick={handleClickCard}
            completedPlatforms={completedPlatforms}
          />

          <EducationCard
            data={mergedData.resumeEducations}
            onClick={handleClickCard}
          />

          <div className="mb-5 w-full">
            <div className="mb-1.5 text-lg font-semibold">자격/수상/교육</div>
            <CertificationCard
              data={mergedData.resumeCertificates}
              onClick={handleClickCard}
              completedPlatforms={completedPlatforms}
            />
          </div>

          <LanguageCard
            data={mergedData.resumeLanguages}
            onClick={handleClickCard}
          />
        </>
      )}
    </>
  );
}
