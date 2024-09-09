import { HrPlatformName, PLATFORM_CONFIG } from '@/app/lib/constants';
import { useEffect, useState } from 'react';
import ResumeUploader, { TabType } from '../../components/resume-uploader';
import { getPlatformStatusClient } from '@/app/lib/api';
import toast from 'react-hot-toast';
import {
  uploadResumeByFile,
  uploadResumeByLink,
  uploadResumeByPlatform,
} from '@/app/lib/resume-upload-helpers';

export default function UploadResume({ onFinish }: { onFinish: () => void }) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<TabType>('플랫폼 연결');
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedPlatforms, setCompletedPlatforms] = useState<
    { value: HrPlatformName; label: string }[]
  >([]);

  useEffect(() => {
    const fetchPlatformStatus = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const statusResult = await getPlatformStatusClient();
        const completed = statusResult
          .filter((item) => item.status === 'completed')
          .map((item) => {
            return {
              value: item.platform,
              label: PLATFORM_CONFIG[item.platform]?.displayName || '',
            };
          });

        setCompletedPlatforms(completed);
      } catch (err) {
        console.error('Error fetching platform status:', err);
        setError('플랫폼 상태를 불러오는 데 실패했습니다.');
        toast.error('플랫폼 상태를 불��오는 데 실패했습니다. 나중에 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlatformStatus();
  }, []);

  const handleFileChange = (file: File | null) => {
    setResumeFile(file);
  };

  const handleUrlChange = (url: string) => {
    setResumeUrl(url);
  };

  const handlePlatformSelect = (platform: string) => {
    // Handle platform selection
    console.log('Platform selected:', platform);
    setSelectedPlatform(platform);
  };

  const handleTabChange = (tab: TabType) => {
    setCurrentTab(tab);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    let success = false;

    const platforms = completedPlatforms.map((p) => p.value);

    if (currentTab === '플랫폼 연결') {
      if (!selectedPlatform) {
        toast.error('플랫폼을 선택하세요.');
        return;
      }
      success = await uploadResumeByPlatform(selectedPlatform, platforms);
    } else if (currentTab === '이력서 링크') {
      if (!resumeUrl) {
        toast.error('링크를 입력하세요.');
        return;
      }
      success = await uploadResumeByLink(resumeUrl, platforms);
    } else if (currentTab === '파일 업로드') {
      if (!resumeFile) {
        toast.error('파일을 선택하세요.');
        return;
      }
      success = await uploadResumeByFile(resumeFile, platforms);
    }

    setIsLoading(false);

    if (success) {
      console.log('success: ', success);
      toast.success('이력서 업로드 성공! 24시간 내 동기화 완료 됩니다.');
      // close modal
      onFinish();
    }
  };

  // Create options for the platform select
  // const optionsForSelect = Object.keys(PLATFORM_CONFIG)
  //   .filter((key): key is HrPlatformName => key !== 'jiwon' && key !== 'custom')
  //   .map((platform) => ({
  //     value: platform,
  //     label: PLATFORM_CONFIG[platform]?.displayName || '',
  //   }));

  return (
    <div>
      <div className="mb-8">
        <p className="mb-1">
          이력서가 업데이트될 플랫폼 (TODO: 기존 계정 로그인 or 부계정 플랫폼 구분x):
        </p>

        {isLoading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : completedPlatforms.length > 0 ? (
          <p>
            {completedPlatforms.map((p) => {
              return (
                <span
                  key={p.value}
                  className="mr-0.5 rounded-lg border border-primary/20 px-1 py-0.5 text-sm shadow"
                >
                  {p.label}
                </span>
              );
            })}
          </p>
        ) : (
          <p>연결된 플랫폼이 없습니다.</p>
        )}
      </div>

      <ResumeUploader
        onFileChange={handleFileChange}
        onUrlChange={handleUrlChange}
        onPlatformSelect={handlePlatformSelect}
        optionsForSelect={completedPlatforms}
        onTabChange={handleTabChange}
        currentTab={currentTab}
      />

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="btn-gradient w-full rounded-full py-3 font-semibold disabled:opacity-50"
      >
        {isLoading ? '이력서 업로드 중...' : '24시간 내 자동 동기화'}
      </button>
    </div>
  );
}
