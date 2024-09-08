// app/app/(users)/onboarding/onboarding-step5.tsx

import { useState } from 'react';
import { validateUrl } from '@/app/lib/utils';
import { ERROR_MESSAGE, HrPlatformName, PLATFORM_CONFIG } from '@/app/lib/constants';
import { saveMainResume } from '@/app/lib/api';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ResumeUploader, { TabType } from '../../components/resume-uploader';

type Step5Props = {
  loggedInPlatforms: HrPlatformName[];
  platformsForSecondAccount: HrPlatformName[];
};

export default function OnboardingStep5({
  loggedInPlatforms,
  platformsForSecondAccount,
}: Step5Props) {
  const router = useRouter();
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabType>('플랫폼 연결');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');

  const allPlatforms = [...loggedInPlatforms, ...platformsForSecondAccount];

  const optionsForSelect = loggedInPlatforms.map((p) => {
    return { value: p, label: PLATFORM_CONFIG[p]?.displayName || '' };
  });

  const handleFileChange = (file: File | null) => {
    setResumeFile(file);
  };

  const handleUrlChange = (url: string) => {
    setResumeUrl(url);
  };

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
  };

  const resumeByPlatform = async () => {
    if (!selectedPlatform) {
      toast.error('플랫폼을 선택하세요.');
      return;
    }

    const formData = new FormData();
    /*
      {
        platform: 대상 플랫폼
        link: 기본 이력서 가져올 플랫폼
      }
      */
    formData.append('link', selectedPlatform);

    const filteredPlatforms = allPlatforms.filter((p) => p !== selectedPlatform);

    if (filteredPlatforms.length === 0) {
      toast.error('연결된 플랫폼이 1곳 밖에 없습니다. 이력서를 연동할 다른 플랫폼이 없습니다');
      return;
    }

    // 셀렉트박스에서 선택한 플랫폼 제외하고 나머지 플랫폼 돌면서 api 요청
    const promises = filteredPlatforms.map((platformId) => {
      formData.append('platform', platformId);
      return saveMainResume(formData);
    });

    setIsLoading(true);
    try {
      const results = await Promise.all(promises);

      let allSuccessful = true;

      results.forEach((result, index) => {
        if (result.error) {
          console.error(`Failed to upload resume for ${allPlatforms[index]}:`, result.error);
          allSuccessful = false;
        } else if (result.detail) {
          // 응답값에 detail: ... 이 있는 경우도 에러로 처리. (api 문서 참고)
          toast.error(`${result.detail[0].msg}`);
          allSuccessful = false;
        }
      });

      if (allSuccessful) {
        toast.success('이력서 업로드 성공! 24시간 내 동기화 완료 됩니다.');
        router.push('/app/account-status');
      }
    } catch (error) {
      toast.error(`${ERROR_MESSAGE.reason.network} ${ERROR_MESSAGE.action.retry}`);
    }
    setIsLoading(false);
  };

  const resumeByLink = async () => {
    // 링크 없으면 링크 추가하라고 토스트
    if (!resumeUrl) {
      toast.error('링크를 입력하세요.');
      return;
    }

    // 링크 유효성 검사
    const validateUrlResult = validateUrl(resumeUrl);
    if (validateUrlResult) {
      toast.error(validateUrlResult);
      return;
    }

    const formData = new FormData();
    /*
      {
        platform: 대상 플랫폼
        link: 이력서 링크
      }
      */
    // 바디에 링크만 담아서 api 요청
    formData.append('link', resumeUrl);
    const promises = allPlatforms.map((platformId) => {
      formData.append('platform', platformId);
      return saveMainResume(formData);
    });

    setIsLoading(true);
    try {
      const results = await Promise.all(promises);

      let allSuccessful = true;

      results.forEach((result, index) => {
        if (result.error) {
          console.error(`Failed to upload resume for ${allPlatforms[index]}:`, result.error);
          allSuccessful = false;
        } else if (result.detail) {
          // 응답값에 detail: ... 이 있는 경우도 에러로 처리. (api 문서 참고)
          toast.error(`${result.detail[0].msg}`);
          allSuccessful = false;
        }
      });

      if (allSuccessful) {
        toast.success('이력서 업로드 성공! 24시간 내 동기화 완료 됩니다.');
        router.push('/app/account-status');
      }
    } catch (error) {
      toast.error(`${ERROR_MESSAGE.reason.network} ${ERROR_MESSAGE.action.retry}`);
    }
    setIsLoading(false);
  };

  const resumeByFile = async () => {
    // 파일 없으면 등록하라고 토스트
    if (!resumeFile) {
      toast.error('파일을 선택하세요.');
      return;
    }

    const formData = new FormData();
    /*
      {
        platform: 대상 플랫폼
        file: 이력서 파일
      }
      */
    // 바디에 파일만 담아서 api 요청
    formData.append('file', resumeFile);

    const promises = allPlatforms.map((platformId) => {
      formData.append('platform', platformId);
      return saveMainResume(formData);
    });

    setIsLoading(true);
    try {
      const results = await Promise.all(promises);

      let allSuccessful = true;

      results.forEach((result, index) => {
        if (result.error) {
          console.error(`Failed to upload resume for ${allPlatforms[index]}:`, result.error);
          allSuccessful = false;
        } else if (result.detail) {
          // 응답값에 detail: ... 이 있는 경우도 에러로 처리. (api 문서 참고)
          toast.error(`${result.detail[0].msg}`);
          allSuccessful = false;
        }
      });

      if (allSuccessful) {
        toast.success('이력서 업로드 성공! 24시간 내 동기화 완료 됩니다.');
        router.push('/app/account-status');
      }
    } catch (error) {
      toast.error(`${ERROR_MESSAGE.reason.network} ${ERROR_MESSAGE.action.retry}`);
    }
    setIsLoading(false);
  };

  // NOTE: api.ts -> api route handler로 호출
  // server actions에서는 File 타입을 전달할 수 없어서
  const handleSubmit = async () => {
    if (currentTab === '플랫폼 연결') {
      await resumeByPlatform();
      return;
    }

    if (currentTab === '이력서 링크') {
      await resumeByLink();
      return;
    }

    if (currentTab === '파일 업로드') {
      await resumeByFile();
      return;
    }
  };

  const handleSkipStep5 = async () => {
    router.push('/app/account-status');
  };

  const handleTabChange = (tab: TabType) => {
    setCurrentTab(tab);
  };

  return (
    <div className="card w-full max-w-2xl p-8">
      {/* heading */}
      <div className="mb-12 text-center">
        <h2 className="mb-6 text-2xl font-semibold">
          각 채용플랫폼에 동기화 할 이력서를 <br /> 업로드해주세요.
        </h2>
        <p className="text-lg">
          완성되지 않은 이력서도 괜찮아요.
          <br />
          업로드 후 추가 편집할 수 있어요.
        </p>
      </div>

      <ResumeUploader
        onFileChange={handleFileChange}
        onUrlChange={handleUrlChange}
        onPlatformSelect={handlePlatformSelect}
        optionsForSelect={optionsForSelect}
        onTabChange={handleTabChange}
        currentTab={currentTab}
      />

      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="btn-gradient w-full rounded-full py-3 font-semibold disabled:opacity-50"
        >
          {isLoading ? '이력서 업로드 중...' : '24시간 내 자동 동기화'}
        </button>
        <button onClick={handleSkipStep5} className="text-sm text-gray-400 underline">
          건너뛰기
        </button>
      </div>
    </div>
  );
}
