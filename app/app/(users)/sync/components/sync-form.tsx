'use client';

import { useState } from 'react';
import { PLATFORM_CONFIG } from '@/app/lib/constants';
import PlatformSelect from './platform-select';
import { useForm, SubmitHandler } from 'react-hook-form';
import { saveMainResume } from '@/app/lib/api';
import SyncJiwon from './sync-jiwon';
import SyncNoticeText from './sync-notice-text';
import toast from 'react-hot-toast';

type Inputs = {
  resumeUrl: string;
  resumeFileList: FileList;
};

const DEFAULT_PLATFORM = 'jiwon';

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

function SaveButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <button
      type="submit"
      className={`btn-gradient mt-8 w-full rounded-full py-2 font-bold text-secondary ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? '저장하는 중..' : '저장하기'}
    </button>
  );
}

function ResumeInputs({ selectedPlatform }: { selectedPlatform: string }) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log('???', data);
    console.log('Submitting form for platform:', selectedPlatform);

    const { resumeUrl, resumeFileList } = data;

    if (selectedPlatform === 'custom' && (!resumeFileList || !resumeUrl)) {
      toast.error('이력서 url 또는 파일을 업로드해 주세요.');
      return;
    }

    // console.log(data);

    // setIsLoading(true); // Start loading

    // console.log('formData', data);

    const resumeFile = resumeFileList[0];

    const formData = new FormData();
    formData.append('platform', selectedPlatform);
    formData.append('link', resumeUrl);
    if (resumeFile) {
      formData.append('file', resumeFile);
    }

    // console.log('client formData', formData);

    try {
      // 유저의 메인 이력서 업로드
      const res = await saveMainResume(formData);
      if (res.success) {
        // 이력서 업로드 완료
        toast.success('이력서 업로드 완료!');
      } else {
        toast.error(res.detail[0].msg);
      }
    } catch (error) {
      toast.error('메인 이력서 저장에 실패했습니다.');
    } finally {
      // setIsLoading(false);

      // Reset fields
      resetField('resumeFileList');
      if (selectedPlatform === 'custom') {
        resetField('resumeUrl');
      }
    }
  };

  if (selectedPlatform === DEFAULT_PLATFORM) {
    return <SyncJiwon />;
  }

  if (selectedPlatform === 'custom') {
    return (
      <div>
        <p>가장 최근 업데이트한 이력서를 자동으로 동기화하세요!</p>
        <p>노션이나, PDF 파일로 관리했다면 해당 파일 또는 링크를 업로드해주세요.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">이력서 url</span>
            <input
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400"
              {...register('resumeUrl')}
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">이력서 파일</span>
            <input
              type="file"
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400"
              {...register('resumeFileList')}
            />
          </label>
          <SaveButton isSubmitting={isSubmitting} />
        </form>
      </div>
    );
  }

  return (
    <div>
      <p>{PLATFORM_CONFIG[selectedPlatform].displayName}에서 다른 채용 플랫폼으로 동기화합니다.</p>
      <SyncNoticeText />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">이력서 파일</span>
          <input
            type="file"
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400"
            {...register('resumeFileList', {
              required: true,
            })}
          />
        </label>
        <SaveButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}
