import { PlatformStatusItem } from '../app/(users)/account-status/types';
import { getUserAuth } from './client-auth';
import { HrPlatformName } from './constants';
import { createElectronRuntime } from './electron-runtime';

// 클라이언트 측에서 호출하는 api layer 모음

// TODO: 하단 함수마다 중복되는 부분 묶을 방법 찾기 (refactoring)
// TODO: api 응답값 타입 잡기
// credentials 받지말고 직접 가져오기 되나? (saveMainResume 참고)
export async function signinApi(email: string, credentials: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

type signupUserData = {
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

// TODO 응답값 타입 잡기
export async function signupApi(userData: signupUserData) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

// TODO 응답값 타입 잡기
export async function saveMainResume(resumeData: FormData) {
  const { credentials } = getUserAuth();

  const response = await fetch('/api/resume/main', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
    },
    body: resumeData,
  });

  if (!response.ok) {
    throw new Error('saving main resume failed');
  }

  return response.json();
}

export async function getMainResumeStatus() {
  const { credentials } = getUserAuth();
  const response = await fetch('/api/resume/main/status', {
    method: 'GET',
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });

  if (!response.ok) {
    throw new Error('get main resume failed');
  }

  return response.json();
}

type CheckResponse = { available: boolean };
// 이메일 중복 확인
export async function getDuplicatedEmail(email: string): Promise<CheckResponse> {
  const response = await fetch(`/api/auth/users/check-email?email=${email}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('check email failed');
  }

  return response.json() as Promise<CheckResponse>;
}

// 전화번호 중복 확인
export async function getDuplicatedTelNo(telNo: string): Promise<CheckResponse> {
  const response = await fetch(`/api/auth/users/check-phone?telNo=${telNo}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('check phone number failed');
  }

  return response.json() as Promise<CheckResponse>; // { available: boolean };
}

export async function getVirtualAvailability(): Promise<CheckResponse> {
  const { credentials } = getUserAuth();

  const response = await fetch('/api/auth/check-virtual', {
    method: 'GET',
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });

  if (!response.ok) {
    throw new Error('check virtual information failed');
  }

  return response.json() as Promise<CheckResponse>; // { available: boolean };
}

// platformName?
export async function connectPlatform(platform: string, requestId?: string) {
  const { credentials } = getUserAuth();

  const bodyData = requestId ? { request_id: requestId } : {};

  const timeoutPromise = new Promise<{ status: 'timeout' }>((resolve) => {
    setTimeout(() => resolve({ status: 'timeout' }), 25000);
  });

  const fetchPromise = fetch(
    `https://secondly-good-walleye.ngrok-free.app/api/platform/connect/${platform}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(bodyData),
    }
  ).then(async (response) => {
    if (!response.ok) {
      throw new Error('connecting platform failed');
    }
    return response.json();
  });

  try {
    const result = await Promise.race([fetchPromise, timeoutPromise]);

    if ('status' in result && result.status === 'timeout') {
      console.error('Request timed out after 25 seconds');
      return { status: 'timeout', error: 'Request timed out' };
    }

    return result;
  } catch (error) {
    console.error('Error in connectPlatform:', error);
    if (error instanceof Error) {
      return { status: 'error', error: error.message };
    }
    return { status: 'error', error: 'An unknown error occurred' };
  }
}

export async function connectPlatformByDesktop(platform: HrPlatformName, requestId?: string) {
  const { credentials } = getUserAuth();

  const timeoutPromise = new Promise<{ status: 'timeout' }>((resolve) => {
    setTimeout(() => resolve({ status: 'timeout' }), 25000);
  });

  const fetchPromise = createElectronRuntime()
    .executeSignupScript(platform, credentials ?? '', requestId ?? null)
    .then(async (response) => {
      console.log(response); // {success: true}

      if (!response.success) {
        throw new Error('connecting platform failed (in desktop)');
      }
      return response;
    });

  try {
    const result = await Promise.race([fetchPromise, timeoutPromise]);

    if ('status' in result && result.status === 'timeout') {
      console.error('Request timed out after 25 seconds');
      return { status: 'timeout', error: 'Request timed out' };
    }

    return result;
  } catch (error) {
    console.error('Error in connectPlatform:', error);
    if (error instanceof Error) {
      return { status: 'error', error: error.message };
    }
    return { status: 'error', error: 'An unknown error occurred' };
  }
}

export async function getPlatformStatusClient(): Promise<PlatformStatusItem[]> {
  const { credentials } = getUserAuth();

  const response = await fetch('/api/platform/statuses', {
    method: 'GET',
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });

  if (!response.ok) {
    throw new Error('get platform status failed');
  }

  return response.json();
}

export async function submitAuthCodeTest(requestId: string, code: string) {
  const { credentials } = getUserAuth();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${baseUrl}/platform/auth/${requestId}/code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify({
      auth_code: code,
      // code: code,
    }),
  });

  if (!response.ok) {
    throw new Error('알 수 없는 오류입니다. 페이지 하단의 고객센터로 문의해 주세요.');
  }

  const result = await response.json();
  /**
    {
      "message": 'Server Error' or 'ID/PW incorrect',
      "success": false
    }
  */

  if (!result.success) {
    // throw new Error(formMessageConnectOrigin(result.message));
    throw new Error('인증에 실패했습니다. 인증 코드를 다시 입력해주세요.');
  }

  return result;
}

export async function getAuthCodeStatus(requestId: string, maxRetries = 13) {
  let retries = 0;

  while (retries < maxRetries) {
    console.log(`${retries + 1}/${maxRetries}`);
    try {
      const { credentials } = getUserAuth();
      if (!credentials) {
        throw new Error('User is not authenticated');
      }

      const response = await fetch(`/api/platform/auth/${requestId}/code`, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (!response.ok) {
        throw new Error('계정 생성 중 오류가 발생했습니다. 카카오톡 채널로 문의해 주세요.');
      }

      const result = await response.json();
      console.log(result.status);

      if (
        result.status === 'code_sent' ||
        result.status === 'completed' ||
        result.status === 'finished' ||
        result.status === 'failed'
      ) {
        return result;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Error in getAuthCodeStatus:', error);

      if (error instanceof Error) {
        throw error;
      }
    }

    retries++;
  }

  console.error('Max retries reached without getting a final status');
  throw new Error('최대 재시도 횟수를 초과했습니다.');
}

const formMessageConnectOrigin = (msg?: string) => {
  if (msg === 'ID/PW incorrect') return '아이디 또는 비밀번호를 다시 확인해 주세요.';
  if (msg === 'Server Error') return '로그인에 실패했어요. 잠시 후 다시 시도해 주세요.';
  return '알 수 없는 오류입니다. 페이지 하단의 고객센터로 문의해 주세요.';
};

export async function connectOriginAccount(platform: HrPlatformName, id: string, pw: string) {
  const { credentials } = getUserAuth();

  if (!credentials) {
    throw new Error('User is not authenticated');
  }

  const apiUrl = 'https://secondly-good-walleye.ngrok-free.app/api';
  const response = await fetch(`${apiUrl}/platform/connect-origin/${platform}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify({
      platform_id: id,
      platform_pw: pw,
    }),
  });

  if (!response.ok) {
    throw new Error(formMessageConnectOrigin());
  }

  const result = await response.json(); //  { message: "ID/PW incorrect", success: false }

  if (!result.success) {
    throw new Error(formMessageConnectOrigin(result.message));
  }

  return result; // {success: 'true'}
}
