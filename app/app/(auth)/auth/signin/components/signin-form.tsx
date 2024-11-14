'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { getVirtualAvailability, signinApi } from '@/app/lib/api';
import { useRouter } from 'next/navigation';
import { base64Encode } from '@/app/lib/utils';
import { toast } from 'react-hot-toast';
import AuthPrompt from '../../components/auth-prompt';
import { clearUserAuth, setUserAuth } from '@/app/lib/client-auth';

type Inputs = {
  email: string;
  password: string;
};

export default function SigninForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const email = data.email;
    const pw = data.password;
    const credentials = base64Encode(`${email}:${pw}`);

    try {
      const res = await signinApi(email, credentials);

      if ('user' in res) {
        setUserAuth(res.user, credentials);

        // 로그인 후 virtual mail 확인
        try {
          const { available } = await getVirtualAvailability();

          toast.success('로그인 성공!');

          if (available) {
            // virtual mail이 있으면 onboarding으로 이동
            router.push('/app/onboarding');
          } else {
            // virtual mail이 없으면 resume로 이동
            router.push('/app/resume');
          }
        } catch (error) {
          toast.error('네트워크 오류입니다. 잠시 후에 다시 시도해 주세요.');
        }
      } else if ('detail' in res) {
        // Handle the error response with a detail
        toast.error(res.detail);
        setFocus('email');
      } else {
        // Handle unexpected error response without a detail
        toast.error('알 수 없는 오류가 발생했습니다. 페이지 하단의 고객센터로 문의해 주세요.');
      }
    } catch (error) {
      clearUserAuth();
      if (error instanceof Error) {
        toast.error('네트워크 오류입니다. 잠시 후에 다시 시도해 주세요.');
      } else {
        toast.error('알 수 없는 오류가 발생했습니다. 페이지 하단의 고객센터로 문의해 주세요.');
      }
    }
  };

  return (
    <div className="card w-full max-w-lg p-8">
      <h2 className="mb-8 text-2xl font-bold text-black">로그인</h2>

      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="mb-4 block">
          <span className="text-black-700 mb-2 block">이메일</span>
          <input
            type="email"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('email', {
              required: true,
            })}
          />
          {errors.email && (
            <span className="text-sm text-error">
              {errors.email.message ?? '이메일을 입력해 주세요.'}
            </span>
          )}
        </label>

        <label className="mb-4 block">
          <span className="text-black-700 mb-2 block">비밀번호</span>
          <input
            type="password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('password', { required: true })}
          />
          {errors.password && <span className="text-sm text-error">비밀번호를 입력해 주세요.</span>}
        </label>

        <button
          type="submit"
          className={`btn-gradient mt-8 w-full rounded-full py-2 font-bold text-white ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <AuthPrompt isSignUpPage={false} />
    </div>
  );
}
