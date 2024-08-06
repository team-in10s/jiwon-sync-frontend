import { saveMainResume } from '@/app/lib/api';
import { PLATFORM_CONFIG } from '@/app/lib/constants';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SaveButton from './save-button';

type Inputs = {
  resumeFileList: FileList;
};

export default function OtherPlatform({ selectedPlatform }: { selectedPlatform: string }) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();
    formData.append('file', data.resumeFileList[0]);

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
      resetField('resumeFileList');
    }
  };

  return (
    <div>
      <p>{PLATFORM_CONFIG[selectedPlatform].displayName}에서 다른 채용 플랫폼으로 동기화합니다.</p>

      <div>
        <p>로그인을 통한 직접 연결은 아직 준비중이예요! 🚧</p>
        <p>이력서 내보내기를 통해 PDF 파일을 업로드해주세요.</p>
      </div>

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
