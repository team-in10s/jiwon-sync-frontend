import React, { useState, useRef, ChangeEvent } from 'react';
import CustomSelect from '../(users)/onboarding/custom-select';

export type Tab = '플랫폼 연결' | '파일 업로드' | '이력서 링크';

type ResumeUploaderProps = {
  onFileChange: (file: File | null) => void;
  onUrlChange: (url: string) => void;
  onPlatformSelect: (platform: string) => void;
  optionsForSelect: { value: string; label: string }[];
  onTabChange: (tab: Tab) => void;
  currentTab: Tab;
};

const tabs: Tab[] = ['플랫폼 연결', '파일 업로드', '이력서 링크'];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export default function ResumeUploader({
  onFileChange,
  onUrlChange,
  onPlatformSelect,
  optionsForSelect,
  onTabChange,
  currentTab,
}: ResumeUploaderProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string>('');
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError('파일 크기는 10MB를 초과할 수 없습니다.');
        setResumeFile(null);
        onFileChange(null);
      } else {
        setFileError(null);
        setResumeFile(file);
        onFileChange(file);
      }
    }
  };

  const handleFileRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    setResumeFile(null);
    setFileError(null);
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setResumeUrl(newUrl);
    onUrlChange(newUrl);
  };

  const handleSelect = (value: string) => {
    onPlatformSelect(value);
  };

  const handleTabChange = (tab: Tab) => {
    onTabChange(tab);
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex justify-between border-b border-b-gray-100/60">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            className={`${currentTab === t ? 'border-b-2 border-b-gray-100/80' : ''} pb-1`}
          >
            {t}
          </button>
        ))}
      </div>
      <div>
        {currentTab === '플랫폼 연결' && (
          <div>
            <CustomSelect options={optionsForSelect} onSelect={handleSelect} />
            <p className="mt-2">에서 기본 이력서를 연동합니다.</p>
          </div>
        )}
        {currentTab === '파일 업로드' && (
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
                  accept=".pdf,.doc,.docx,.hwp"
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
        {currentTab === '이력서 링크' && (
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
  );
}
