// import { getServerAuth } from './server-auth';
import { getUserAuth } from './client-auth';

// 클라이언트 측에서 호출하는 api layer 모음...?

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

// TODO 응답값 타입 잡기
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

// 이메일 중복 확인
type CheckResponse = { available: boolean };

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

// platformName?
export async function connectPlatform(platform: string, connectData?: { requestId: string }) {
  const { credentials } = getUserAuth();

  const response = await fetch(`/api/platform/connect/${platform}`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify(connectData ?? {}),
  });

  if (!response.ok) {
    throw new Error('connecting platform failed');
  }

  return response.json();
}

export async function getPlatformStatusClient() {
  console.log('getPlatformStatus called');
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
