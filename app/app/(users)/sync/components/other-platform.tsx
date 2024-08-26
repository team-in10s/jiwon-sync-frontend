'use client';

import { saveMainResume } from '@/app/lib/api';
import { HrPlatformName, PLATFORM_CONFIG } from '@/app/lib/constants';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SaveButton from './save-button';
import { useEffect, useState } from 'react';
import FileInput from './file-input';

type Inputs = {
  // resumeFile: FileList;
  resumeFile: File;
};

export default function OtherPlatform({ selectedPlatform }: { selectedPlatform: HrPlatformName }) {
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (_) => {
    const submittedFile = getValues('resumeFile');

    const formData = new FormData();
    formData.append('platform', selectedPlatform);
    formData.append('file', submittedFile);
    // formData.append('link', '');

    try {
      const res = await saveMainResume(formData);
      if (res.success) {
        toast.success('이력서 업로드 완료! 24시간 내 동기화 완료 됩니다.');
      } else {
        toast.error(res.detail[0].msg);
      }
    } catch (error) {
      toast.error('메인 이력서 저장에 실패했습니다.');
    } finally {
      resetField('resumeFile');
      setSelectedFileName(null);
    }
  };

  useEffect(() => {
    setSelectedFileName(null);
    resetField('resumeFile');
  }, [selectedPlatform, resetField]);

  return (
    <div>
      <p>{PLATFORM_CONFIG[selectedPlatform]?.displayName}에서 다른 채용 플랫폼으로 동기화합니다.</p>
      <p className="mb-1">이력서 내보내기를 통해 PDF 파일을 업로드해주세요.</p>
      <p className="mb-4 text-sm text-gray-300">
        (로그인을 통한 직접 연결은 아직 준비중이에요! 🚧)
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FileInput
          register={register}
          setValue={setValue}
          fieldName="resumeFile"
          placeholder={`${PLATFORM_CONFIG[selectedPlatform]?.displayName} 이력서 파일을 여기에 드래그하거나 클릭하여 업로드하세요`}
          selectedFileName={selectedFileName}
          setSelectedFileName={setSelectedFileName}
        />

        <SaveButton isSubmitting={isSubmitting} disabled={!selectedFileName} />
      </form>
    </div>
  );
}
