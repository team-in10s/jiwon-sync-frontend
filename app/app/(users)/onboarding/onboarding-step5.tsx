// app/app/(users)/onboarding/onboarding-step5.tsx

import { useState, ChangeEvent, useRef } from 'react';
import { validateUrl } from '@/app/lib/utils';
import { ERROR_MESSAGE, HrPlatformName, PLATFORM_CONFIG } from '@/app/lib/constants';
import { saveMainResume } from '@/app/lib/api';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import CustomSelect from './custom-select';

type Step5Props = {
  loggedInPlatforms: HrPlatformName[];
  platformsForSecondAccount: HrPlatformName[];
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

type Tab = '플랫폼 연결' | '파일 업로드' | '이력서 링크';
const tabs: Tab[] = ['플랫폼 연결', '파일 업로드', '이력서 링크'];

export default function OnboardingStep5({
  loggedInPlatforms,
  platformsForSecondAccount,
}: Step5Props) {
  const router = useRouter();
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currrentTab, setCurrrentTab] = useState<Tab>(tabs[0]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const allPlatforms = [...loggedInPlatforms, ...platformsForSecondAccount];

  const optionsForSelect = loggedInPlatforms.map((p) => {
    return { value: p, label: PLATFORM_CONFIG[p]?.displayName || '' };
  });

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setResumeUrl(newUrl);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError('파일 크기는 10MB를 초과할 수 없습니다.');
        setResumeFile(null);
      } else {
        setFileError(null);
        setResumeFile(file);
      }
    }
  };

  const handleFileRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    setResumeFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

  // NOTE: 예외, api.ts -> api route handler로 호출
  // server actions에서는 File 타입을 전달할 수 없어서
  const handleSubmit = async () => {
    if (currrentTab === '플랫폼 연결') {
      await resumeByPlatform();
      return;
    }

    if (currrentTab === '이력서 링크') {
      await resumeByLink();
      return;
    }

    if (currrentTab === '파일 업로드') {
      await resumeByFile();
      return;
    }
  };

  const handleSkipStep5 = async () => {
    router.push('/app/account-status');
  };

  const handleSelect = (value: string) => {
    setSelectedPlatform(value);
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

      <div className="mb-6 space-y-4">
        {/* tab.. */}
        <div className="flex justify-between border-b border-b-gray-100/60">
          {tabs.map((t) => {
            return (
              <button
                key={t}
                onClick={() => {
                  setCurrrentTab(t);
                }}
                className={`${currrentTab === t ? 'border-b-2 border-b-gray-100/80' : ''} pb-1`}
              >
                {t}
              </button>
            );
          })}
        </div>
        {/* menu for each tab */}
        <div>
          {currrentTab === '플랫폼 연결' && (
            <div>
              <CustomSelect options={optionsForSelect} onSelect={handleSelect} />
              <p className="mt-2">에서 기본 이력서를 연동합니다.</p>
            </div>
          )}
          {currrentTab === '파일 업로드' && (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="resume-file"
                  className="grow cursor-pointer rounded-md border border-dashed border-gray-500 bg-gray-700 p-2 text-white"
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-file"
                    ref={fileInputRef}
                    accept=".pdf,.doc,.docx,.hwp" // 허용할 파일 형식을 지정
                  />

                  <span className="block w-full truncate text-gray-400">
                    {resumeFile ? resumeFile.name : '파일 선택 (최대 10MB)'}
                  </span>
                </label>
                {resumeFile && (
                  <button
                    onClick={handleFileRemove}
                    className="rounded-md bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
                  >
                    삭제
                  </button>
                )}
              </div>
              {fileError && <p className="text-sm text-red-500">{fileError}</p>}
            </div>
          )}
          {currrentTab === '이력서 링크' && (
            <div className="flex flex-col space-y-2">
              <input
                id="resume-url"
                type="url"
                placeholder="이력서 URL 입력 (링크드인, Notion 등)"
                value={resumeUrl}
                onChange={handleUrlChange}
                className="rounded-md border border-gray-500 bg-gray-700 p-2 text-white"
              />
            </div>
          )}
        </div>
      </div>

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
