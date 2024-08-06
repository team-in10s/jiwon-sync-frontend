'use client';

import { saveMainResume } from '@/app/lib/api';
import { PLATFORM_CONFIG } from '@/app/lib/constants';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SaveButton from './save-button';
import { useState } from 'react';

type Inputs = {
  // resumeFile: FileList;
  resumeFile: File;
};

export default function OtherPlatform({ selectedPlatform }: { selectedPlatform: string }) {
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFileName(file.name);
      // setValue('resumeFile', e.target.files!); // Update the form value
      setValue('resumeFile', file); // Update the form value
    } else {
      setSelectedFileName(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      // setValue('resumeFile', e.dataTransfer.files!); // Update the form value
      setValue('resumeFile', file); // Update the form value
    }
    setIsDragging(false);
  };

  const onSubmit: SubmitHandler<Inputs> = async (_) => {
    const submittedFile = getValues('resumeFile');

    const formData = new FormData();
    formData.append('platform', selectedPlatform);
    formData.append('file', submittedFile);
    formData.append('link', '');

    try {
      const res = await saveMainResume(formData);
      if (res.success) {
        toast.success('이력서 업로드 완료!');
      } else {
        toast.error(res.detail[0].msg);
      }
    } catch (error) {
      toast.error('메인 이력서 저장에 실패했습니다.');
    } finally {
      resetField('resumeFile');
    }
  };

  return (
    <div>
      <p>{PLATFORM_CONFIG[selectedPlatform].displayName}에서 다른 채용 플랫폼으로 동기화합니다.</p>
      <p className="mb-1">이력서 내보내기를 통해 PDF 파일을 업로드해주세요.</p>
      <p className="mb-4 text-sm text-gray-300">
        (로그인을 통한 직접 연결은 아직 준비중이에요! 🚧)
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="resumeFile"
          className={`mb-3 block w-full cursor-pointer rounded-lg border-2 border-dashed border-primary/60 ${isDragging ? 'bg-primary/10' : 'bg-[#2d2d2d]'} px-4 py-8 text-center transition duration-300 ease-in-out hover:border-primary hover:bg-primary/10`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="resumeFile"
            className="hidden"
            {...register('resumeFile')}
            onChange={handleFileChange}
          />
          <span>
            {selectedFileName ||
              `${PLATFORM_CONFIG[selectedPlatform].displayName} 이력서 파일을 여기에 드래그하거나
            클릭하여 업로드하세요`}
          </span>
        </label>

        <SaveButton isSubmitting={isSubmitting} disabled={!selectedFileName} />
      </form>
    </div>
  );
}
