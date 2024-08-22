'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { signupApi } from '@/app/lib/api';
import { useRouter } from 'next/navigation';
import AuthPrompt from '../../components/auth-prompt';
import { ChangeEvent, useEffect, useState } from 'react';
import { validateEmail, validatePhoneNumber } from '@/app/lib/utils';
import { getDuplicatedEmail, getDuplicatedTelNo } from '@/app/lib/api';
import { toast } from 'react-hot-toast';
import { ERROR_MESSAGE } from '@/app/lib/constants';

type Inputs = {
  name: string;
  email: string;
  password: string;
  telNo: string;
  yearsOfExp: number;
  jobTitle: 'marketer' | 'pm' | 'developer' | 'operation' | 'sales' | 'other';
  customJobTitle?: string;
  gender: 'male' | 'female' | 'other';
  birthDate: string;
};

// TODO: 더 작은 단위로 (input 단위) 재사용 컴포넌트 생성 뒤
// 그것들을 조합하는 방식으로 SignupForm 컴포넌트 구성할것
export default function SignupForm() {
  const router = useRouter();
  const [isOtherJobTitle, setIsOtherJobTitle] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [telNoChecked, setTelNoChecked] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingTelNo, setIsCheckingTelNo] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!emailChecked || !telNoChecked) {
      toast.error('이메일 및 전화번호 중복 확인을 해주세요.');
      return;
    }

    const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
    if (!isPasswordValid) {
      toast.error('비밀번호 조건을 모두 충족해야 합니다.');
      return;
    }

    try {
      const res = await signupApi(data);

      // res.message -> 성공
      // res.detail -> 실패 (뭐가 부족해서 가입이 안됨)

      if (res.message) {
        toast.success('회원가입 성공!');
        router.push('/app/auth/signin');
      } else {
        // TODO: 회원가입 중에 뭐가 부족해서 가입이 안되는것인지 파악하기 쉽게 개선
        // 클라이언트에서 유효성 검사를 잘해서 부족한 값이 없도록 최대한 촘촘하게 짜는 것이 우선
        toast.error(res.detail[0].msg);
      }
    } catch (error) {
      console.log('signup error - ', error);
      toast.error(`${ERROR_MESSAGE.reason.network} ${ERROR_MESSAGE.action.retry}`);
    }
  };

  const handleJobTitleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setIsOtherJobTitle(event.target.value === 'other');
  };

  const checkEmailDuplication = async () => {
    if (errors.email) {
      clearErrors('email');
    }

    const email = watch('email');

    if (!validateEmail(email)) {
      // alert('이메일 형식을 다시 확인해 주세요.'); // TODO: 토스트로 변경
      toast.error('이메일 형식을 다시 확인해 주세요.');
      return;
    }

    setIsCheckingEmail(true);

    try {
      const { available } = await getDuplicatedEmail(email);

      if (available) {
        setEmailChecked(true);
      } else {
        setEmailChecked(false);
        setError('email', { type: 'custom', message: '이메일이 이미 존재합니다.' });
        setFocus('email');
      }
    } catch (error) {
      toast.error(`${ERROR_MESSAGE.reason.network} ${ERROR_MESSAGE.action.retry}`);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const checkTelNoDuplication = async () => {
    if (errors.telNo) {
      clearErrors('telNo');
    }

    const telNo = watch('telNo');

    if (!validatePhoneNumber(telNo)) {
      // alert('전화번호 형식을 다시 확인해 주세요.'); // TODO: 토스트로 변경
      toast.error('전화번호 형식을 다시 확인해 주세요.');
      return;
    }

    setIsCheckingTelNo(true);

    try {
      const { available } = await getDuplicatedTelNo(telNo);
      if (available) {
        setTelNoChecked(true);
      } else {
        setTelNoChecked(false);
        setError('telNo', { type: 'custom', message: '전화번호가 이미 존재합니다.' });
        setFocus('telNo');
      }
    } catch (error) {
      toast.error(`${ERROR_MESSAGE.reason.network} ${ERROR_MESSAGE.action.retry}`);
    } finally {
      setIsCheckingTelNo(false);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'email') {
        setEmailChecked(false);
      } else if (name === 'telNo') {
        setTelNoChecked(false);
      } else if (name === 'password') {
        const password = value.password || '';
        setPasswordCriteria({
          length: password.length >= 8,
          uppercase: /[A-Z]/.test(password),
          lowercase: /[a-z]/.test(password),
          number: /[0-9]/.test(password),
          special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="card w-full max-w-lg p-8">
      <h2 className="mb-8 text-2xl font-bold text-white">회원가입</h2>

      {/* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="mb-4 block">
          <span className="text-white-700 mb-2 block">이름</span>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('name', { required: true })}
          />
          {/* {errors.email && <span>This field is required</span>} */}
        </label>

        <label className="mb-4 block">
          <span className="text-white-700 mb-2 block">이메일</span>
          <div className="flex gap-1.5">
            <input
              type="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('email', {
                required: true,
                validate: validateEmail,
              })}
              // {...register('email', { required: true })}
              // onChange={() => setEmailChecked(false)}
            />
            <button
              type="button"
              className={`ml-2 w-32 rounded-md px-3 py-2 text-white ${isCheckingEmail ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-500'}`}
              onClick={checkEmailDuplication}
              disabled={isCheckingEmail}
            >
              {isCheckingEmail ? '확인 중...' : '중복 확인'}
            </button>
          </div>
          {errors.email && (
            <span className="text-sm text-error">
              {errors.email.message || '유효한 이메일 주소를 입력하세요.'}
            </span>
          )}
          {emailChecked && (
            <span className="text-sm text-green-500">사용 가능한 이메일입니다.</span>
          )}
        </label>

        <label className="mb-4 block">
          <span className="text-white-700 mb-2 block">비밀번호</span>
          <input
            type="password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('password', { required: true })}
          />
          {/* {errors.password && <span>This field is required</span>} */}
          <ul className="mt-2 text-sm text-gray-500">
            <li className={passwordCriteria.length ? 'text-green-500' : ''}>✔️ 8자 이상</li>
            <li className={passwordCriteria.uppercase ? 'text-green-500' : ''}>✔️ 대문자 포함</li>
            <li className={passwordCriteria.lowercase ? 'text-green-500' : ''}>✔️ 소문자 포함</li>
            <li className={passwordCriteria.number ? 'text-green-500' : ''}>✔️ 숫자 포함</li>
            <li className={passwordCriteria.special ? 'text-green-500' : ''}>✔️ 특수문자 포함</li>
          </ul>
        </label>

        <label className="mb-4 block">
          <span className="text-white-700 mb-2 block">전화번호</span>
          <div className="flex gap-1.5">
            <input
              type="tel"
              placeholder="예: 01012345678"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('telNo', {
                required: true,
                validate: validatePhoneNumber,
              })}
              // {...register('telNo', { required: true })}
              // onChange={() => setTelNoChecked(false)}
            />

            <button
              type="button"
              className={`ml-2 w-32 rounded-md px-3 py-2 text-white ${isCheckingTelNo ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-500'}`}
              onClick={checkTelNoDuplication}
              disabled={isCheckingTelNo}
            >
              {isCheckingTelNo ? '확인 중...' : '중복 확인'}
            </button>
          </div>
          {errors.telNo && (
            <span className="text-sm text-error">
              {errors.telNo.message || '유효한 전화번호를 입력하세요.'}
            </span>
          )}
          {telNoChecked && (
            <span className="text-sm text-green-500">사용 가능한 전화번호입니다.</span>
          )}
        </label>

        <label className="mb-4 block">
          <span className="text-white-700 mb-2 block">경력 (년)</span>
          <input
            min={1}
            max={50}
            type="number"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('yearsOfExp', { required: true })}
          />
          {/* {errors.password && <span>This field is required</span>} */}
        </label>

        <label className="mb-4 block">
          <span className="text-white-700 mb-2 block">직무</span>
          <select
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('jobTitle', { required: true })}
            onChange={handleJobTitleChange}
          >
            <option value="marketer">마케터</option>
            <option value="pm">프로젝트 매니저</option>
            <option value="developer">개발자</option>
            <option value="operation">운영</option>
            <option value="sales">영업</option>
            <option value="other">기타</option>
          </select>
        </label>

        {isOtherJobTitle && (
          <label className="mb-4 block">
            {/* <span className="text-white-700 mb-2 block"></span> */}
            <input
              placeholder="직무를 직접 입력해 주세요."
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('customJobTitle', { required: isOtherJobTitle })}
            />
          </label>
        )}

        <label className="mb-4 block">
          <span className="text-white-700 mb-2 block">성별</span>
          <select
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('gender', { required: true })}
          >
            <option value="male">남성</option>
            <option value="female">여성</option>
            <option value="other">기타</option>
          </select>
          {/* {errors.gender && <span>This field is required</span>} */}
        </label>

        <label className="mb-4 block">
          <span className="text-white-700 mb-2 block">생년월일 (YYYYMMDD)</span>
          <input
            maxLength={8}
            inputMode="numeric"
            placeholder="예) 19900101"
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('birthDate', { required: true })}
          />
        </label>

        <button
          type="submit"
          className={`btn-gradient mt-8 w-full rounded-full py-2 font-bold text-secondary ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? '회원가입 진행중...' : '회원가입'}
        </button>
      </form>

      <AuthPrompt isSignUpPage />
    </div>
  );
}
