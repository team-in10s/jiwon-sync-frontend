'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { signinApi } from '@/app/lib/api';
import { useRouter } from 'next/navigation';
import { base64Encode } from '@/app/lib/utils';
import { setUserAuth, clearUserAuth } from '@/app/lib/auth';
import { toast } from 'react-hot-toast';
import { ERROR_MESSAGE } from '@/app/lib/constants';
import AuthPrompt from '../../components/auth-prompt';

type Inputs = {
  email: string;
  password: string;
};

// TODO: 더 작은 단위로 (input 단위) 재사용 컴포넌트 생성 뒤
// 그것들을 조합하는 방식으로 LoginForm 컴포넌트 구성할것
export default function SigninForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  // TODO: form 제출을 server actions 으로 가능한지 검토
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const email = data.email;
    const pw = data.password;
    const credentials = base64Encode(`${email}:${pw}`);

    // apiLogin 호출
    try {
      const res = await signinApi(email, credentials);

      if (res.user) {
        setUserAuth(res.user, credentials);
        toast.success('로그인 성공!');
        router.push('/app/sync');
      } else {
        toast.error(`${ERROR_MESSAGE.reason.authentication} \n ${ERROR_MESSAGE.action.recheck}`);
        setFocus('email');
      }
    } catch (error) {
      clearUserAuth();
      toast.error(`${ERROR_MESSAGE.reason.network} ${ERROR_MESSAGE.action.retry}`);
    }
  };

  return (
    <div className="card w-full max-w-lg p-8">
      <h2 className="mb-8 text-2xl font-bold text-white">로그인</h2>

      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="mb-4 block">
          <span className="text-white-700 mb-2 block">이메일</span>
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
          <span className="text-white-700 mb-2 block">비밀번호</span>
          <input
            type="password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('password', { required: true })}
          />
          {errors.password && <span className="text-sm text-error">비밀번호를 입력해 주세요.</span>}
        </label>

        <button
          type="submit"
          className={`btn-gradient mt-8 w-full rounded-full py-2 font-bold text-secondary ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <AuthPrompt isSignUpPage={false} />
    </div>
  );
}
