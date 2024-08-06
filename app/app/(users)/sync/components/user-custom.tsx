import { saveMainResume } from '@/app/lib/api';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SaveButton from './save-button';

type Inputs = {
  resumeUrl: string;
  resumeFileList: FileList;
};

export default function UserCustom() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { resumeUrl, resumeFileList } = data;

    if (!resumeFileList || !resumeUrl) {
      toast.error('이력서 url 또는 파일을 업로드해 주세요.');
      return;
    }

    const resumeFile = resumeFileList[0];

    const formData = new FormData();
    formData.append('link', resumeUrl);
    if (resumeFile) {
      formData.append('file', resumeFile);
    }

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
      // Reset fields
      resetField('resumeFileList');
      resetField('resumeUrl');
    }
  };

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
