'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getVirtualAvailability, signinApi } from '@/app/lib/api';
import { useRouter } from 'next/navigation';
import { base64Encode } from '@/app/lib/utils';
import { toast } from 'react-hot-toast';
import { ERROR_MESSAGE } from '@/app/lib/constants';
import { clearUserAuth, setUserAuth } from '@/app/lib/client-auth';
import Link from 'next/link';
import { useEffect } from 'react';

const signinSchema = z.object({
  email: z.string().min(1, '이메일을 입력해 주세요.').email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해 주세요.')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

type SigninInputs = z.infer<typeof signinSchema>;

// TODO: 더 작은 단위로 (input 단위) 재사용 컴포넌트 생성 뒤
// 그것들을 조합하는 방식으로 LoginForm 컴포넌트 구성할것
export default function SigninForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SigninInputs>({
    resolver: zodResolver(signinSchema),
  });

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  // TODO: form 제출을 server actions 으로 가능한지 검토
  const onSubmit: SubmitHandler<SigninInputs> = async (data) => {
    const email = data.email;
    const pw = data.password;
    const credentials = base64Encode(`${email}:${pw}`);

    // apiLogin 호출
    try {
      const res = await signinApi(email, credentials);

      if (res.user) {
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
          toast.error(`${ERROR_MESSAGE.reason.network} ${ERROR_MESSAGE.action.retry}`);
        }
        // 끝: 로그인 후 virtual mail 확인
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
    <div className="w-[26.75rem] px-[3.25rem] py-9">
      <p className="mb-12 text-center text-2xl font-semibold text-gray-02 sm:text-[2.25rem] md:text-[3rem] lg:text-[4rem]">
        환영합니다!
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 flex flex-col gap-[1.125rem]">
          <label>
            <span className="text-[0.625rem] font-medium">이메일 또는 휴대전화번호</span>
            {errors.email && (
              <span className="ml-1 text-[0.625rem] font-medium text-context-error">
                {errors.email.message}
              </span>
            )}

            <input
              type="email"
              className="mt-1 w-full border-b border-gray-300 px-3 py-2 text-gray-02 focus:rounded-md focus:border-white focus:outline-none focus:ring focus:ring-context-placeholder"
              {...register('email')}
            />
          </label>

          <label>
            <span className="text-[0.625rem] font-medium">비밀번호</span>
            {errors.password && (
              <span className="ml-1 text-[0.625rem] font-medium text-context-error">
                {errors.password.message}
              </span>
            )}
            <input
              type="password"
              className="my-1 w-full border-b border-gray-300 px-3 py-2 text-gray-02 focus:rounded-md focus:border-white focus:outline-none focus:ring focus:ring-context-placeholder"
              {...register('password')}
            />

            <Link
              // href="/auth/reset-password"
              href="#" // TODO: 비밀번호 찾기 페이지 만들면 수정
              className="block text-right text-[0.625rem] font-medium text-purple-02"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </label>
        </div>

        <div>
          <button
            type="submit"
            className={`mb-2 w-full rounded bg-purple-02 py-4 text-base font-medium text-white ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex justify-center gap-1 py-[0.4375rem]">
                <span className="bg-purple-00 size-2 animate-blink rounded-full"></span>
                <span className="animation-delay-200 bg-purple-00 size-2 animate-blink rounded-full"></span>
                <span className="animation-delay-400 bg-purple-00 size-2 animate-blink rounded-full"></span>
              </span>
            ) : (
              '로그인'
            )}
          </button>

          <Link
            href="/auth/signup"
            className={`block w-full rounded border-[3px] border-purple-02 py-4 text-center text-base font-medium text-purple-02 ${
              isSubmitting ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            새로운 계정 만들기
          </Link>
        </div>
      </form>
    </div>
  );
}
