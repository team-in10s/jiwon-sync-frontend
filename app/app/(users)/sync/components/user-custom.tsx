import { saveMainResume } from '@/app/lib/api';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SaveButton from './save-button';
import { useState } from 'react';
import FileInput from './file-input';

type Inputs = {
  resumeUrl: string;
  resumeFile: File;
};

export default function UserCustom() {
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    getValues,
    watch,
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const watchResumeUrl = watch('resumeUrl');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { resumeUrl } = data;
    const submittedFile = getValues('resumeFile');

    const formData = new FormData();
    formData.append('platform', 'linkfile');
    formData.append('link', resumeUrl);
    formData.append('file', submittedFile);

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
      // Reset fields
      resetField('resumeUrl');
      resetField('resumeFile');
      setSelectedFileName(null);
    }
  };

  return (
    <div>
      <p>가장 최근 업데이트한 이력서를 자동으로 동기화하세요!</p>
      <p className="mb-4">노션이나, PDF 파일로 관리했다면 해당 파일 또는 링크를 업로드해주세요.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="mb-2 block">
          {/* <span className="block text-sm font-medium text-slate-200">이력서 url</span> */}
          <input
            className="mt-1 block w-full cursor-pointer rounded-lg border border-gray-600 bg-gray-700 p-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('resumeUrl')}
            placeholder="이력서 url을 여기에 입력하세요"
          />
        </label>

        <div className="mb-2 w-full text-center">또는</div>

        <FileInput
          register={register}
          setValue={setValue}
          fieldName="resumeFile"
          placeholder="이력서 파일을 여기에 드래그 하거나 클릭하여 업로드 하세요"
          selectedFileName={selectedFileName}
          setSelectedFileName={setSelectedFileName}
        />

        <SaveButton isSubmitting={isSubmitting} disabled={!selectedFileName && !watchResumeUrl} />
      </form>
    </div>
  );
}
