// app/app/(auth)/auth/signup/components/signup-form.tsx

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
import PasswordCriteria from './password-criteria';
import useMetaPixel from '@/app/hooks/use-meta-pixel';

function validateBirthdate(birthdate: string): string | null {
  const datePattern = /^\d{8}$/;
  if (!datePattern.test(birthdate)) {
    return '올바른 생년월일 형식이 아닙니다. (YYYYMMDD)';
  }

  const year = parseInt(birthdate.substring(0, 4), 10);
  const month = parseInt(birthdate.substring(4, 6), 10) - 1; // Months are 0-based in JavaScript
  const day = parseInt(birthdate.substring(6, 8), 10);

  const date = new Date(year, month, day);
  const now = new Date();

  if (date > now) {
    return '미래의 날짜는 입력할 수 없습니다.';
  }
  if (year < 1900) {
    return '1900년 이전의 날짜는 입력할 수 없습니다.';
  }

  return null;
}

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
  const { handleMetaPixelEvent } = useMetaPixel();

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

    // 생년월일 검사
    const birthDateError = validateBirthdate(data.birthDate);
    if (birthDateError) {
      toast.error(birthDateError);
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

      // false면 router.push ('')

      if (res.message || (typeof res.detail === 'string' && res.detail.includes('mailslurp.mx'))) {
        handleMetaPixelEvent();
        toast.success('회원가입 성공!');
        router.push('/app/auth/signin');
        // router.push('/app/jiwon-download'); // TODO: 나중에 데스크탑 앱 배포하면 사용
      } else {
        // TODO: logger 로그 저장할 수 있는 무언가를 찾기 (시간, 응답 내용 등...)
        // TODO: 한번 쫙 테스트 toast error 내부 메시지가 빈 값인 경우 "고객센터 문의 .."로 수정하기
        if (res.detail[0].msg) {
          toast.error(res.detail[0].msg);
        } else {
          toast.error('회원가입 중 에러가 발생했어요. 페이지 하단의 고객센터로 문의해 주세요.');
        }
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
  }, [watch, setEmailChecked, setTelNoChecked, setPasswordCriteria]);

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
          <PasswordCriteria criteria={passwordCriteria} />
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
            min={0}
            max={50}
            type="number"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('yearsOfExp', { required: true })}
          />
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
