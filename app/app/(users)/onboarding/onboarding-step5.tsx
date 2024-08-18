// app/app/(users)/onboarding/onboarding-step5.tsx

import { useState, ChangeEvent, useRef } from 'react';
import { validateUrl, addHttpsProtocol } from '@/app/lib/utils';
import { ERROR_MESSAGE, HrPlatformName } from '@/app/lib/constants';
import { saveMainResume } from '@/app/lib/api';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type Step5Props = {
  // onComplete: (resumeData: { url?: string; file?: File }) => void;
  selectedPlatforms: HrPlatformName[];
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export default function OnboardingStep5({ selectedPlatforms }: Step5Props) {
  const router = useRouter();
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setResumeUrl(newUrl);
    setUrlError(validateUrl(newUrl));
  };

  const handleUrlBlur = () => {
    const updatedUrl = addHttpsProtocol(resumeUrl);
    setResumeUrl(updatedUrl);
    setUrlError(validateUrl(updatedUrl));
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

  // 예외: api.ts -> api route handler로 호출
  // server actions에서는 File 타입을 전달할 수 없어서
  const handleSubmit = async () => {
    setIsLoading(true);

    const formData = new FormData();

    try {
      const promises = selectedPlatforms.map((platformId) => {
        formData.append('platform', platformId);
        if (resumeUrl) formData.append('link', resumeUrl);
        if (resumeFile) formData.append('file', resumeFile);

        return saveMainResume(formData);
      });

      const results = await Promise.all(promises);

      let allSuccessful = true;

      results.forEach((result, index) => {
        if (result.error) {
          console.error(`Failed to upload resume for ${selectedPlatforms[index]}:`, result.error);
          allSuccessful = false;
        } else if (result.detail) {
          // 응답값에 detail: ... 이 있는 경우도 에러로 처리. (api 문서 참고)
          toast.error(`${result.detail[0].msg}`);
          allSuccessful = false;
        }
      });

      if (allSuccessful) {
        toast.success('이력서 업로드 성공!');
        router.push('/app/account-status');
      }
    } catch (error) {
      toast.error(`${ERROR_MESSAGE.reason.network} ${ERROR_MESSAGE.action.retry}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipStep5 = async () => {
    router.push('/app/account-status');
  };

  const isSubmitDisabled = ((!resumeUrl || !!urlError) && !resumeFile) || !!fileError;

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
        <div className="flex flex-col space-y-2">
          <input
            id="resume-url"
            type="text"
            placeholder="이력서 URL 입력 (링크드인, Notion 등)"
            value={resumeUrl}
            onChange={handleUrlChange}
            onBlur={handleUrlBlur}
            className={`rounded-md border ${
              urlError ? 'border-red-500' : 'border-gray-500'
            } bg-gray-700 p-2 text-white`}
          />
          {urlError && <p className="text-sm text-red-500">{urlError}</p>}
        </div>

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
      </div>

      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={handleSubmit}
          disabled={isSubmitDisabled || isLoading}
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
