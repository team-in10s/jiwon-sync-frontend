// app/app/(users)/onboarding/actions.ts

'use server';

import { redirect } from 'next/navigation';
import { HrPlatformName } from '@/app/lib/constants';
import { getServerAuth } from '@/app/lib/server-auth';

const API_BASE_URL = process.env.API_BASE_URL; // ~i

export async function redirectResumeAction() {
  redirect('/app/resume');
}

// TODO: refactoring
export async function createAccountWithEmailAction(platform: HrPlatformName) {
  // connectPlatformUseCase(platform); // 테스트용으로 use case 스킵하고...
  // connectPlatformService(platform);

  const { credentials } = getServerAuth();

  fetch(`${API_BASE_URL}/platform/connect/${platform}`, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
  });

  return { success: true };
}

export async function getRequestId(platform: HrPlatformName) {
  const { credentials } = getServerAuth();

  const response = await fetch(`${API_BASE_URL}/platform/auth/${platform}/request`, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
  });

  if (!response.ok) {
    throw new Error('인증 요청에 실패하였습니다. (getRequestId)');
  }

  const result = await response.json();
  console.log('getRequestId response:', result);

  return result.request_id;

  /*
  {
    message: '인증 요청이 생성되었습니다.',
    request_id: '8b2f04f9-d01f-4777-92c0-38700af00d3e'
  }
  */
}

export async function connectPhonePlatform(requestId: string, platform: HrPlatformName) {
  const { credentials } = getServerAuth();
  // 주의: 아래 api는 계정 생성 다 끝나면 응답 넘어오는 api임
  const response = await fetch(`${API_BASE_URL}/platform/connect/${platform}`, {
    method: 'POST',
    body: JSON.stringify({
      request_id: requestId,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
  });

  if (!response.ok) {
    throw new Error('계정 생성에 실패하였습니다. (connect)');
  }

  const result = await response.json(); // { msg: 'connect started' }

  return result;
}

export async function getAuthCodeStatus(requestId: string, maxRetries = 5) {
  console.log('getAuthCodeStatus 호출됨..');
  let retries = 0;
  while (retries < maxRetries) {
    console.log(`반복문 시작... (시도 ${retries + 1}/${maxRetries})`);

    try {
      console.log(`Fetching: ${API_BASE_URL}/platform/auth/${requestId}/code`);
      const { credentials } = getServerAuth();
      console.log('Credentials obtained');

      const response = await fetch(`${API_BASE_URL}/platform/auth/${requestId}/code`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${credentials}`,
        },
      });
      console.log('Fetch response received:', response.status, response.statusText);

      if (!response.ok) {
        console.error('Response not OK:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Parsing response JSON');
      const result = await response.json();
      console.log('getAuthCodeStatus response:', result);

      if (
        result.status === 'code_sent' ||
        result.status === 'completed' ||
        result.status === 'failed' ||
        result.status === 'finished'
      ) {
        console.log('Returning result:', result);
        return {
          requestId: result.request_id,
          status: result.status,
        };
      }

      console.log('Status not final, waiting 4 seconds before next attempt');
      await new Promise((resolve) => setTimeout(resolve, 3000));
    } catch (error) {
      console.error('Error in getAuthCodeStatus:', error);
      // Decide whether to throw the error or continue with the next iteration
      // For now, we'll log it and continue
    }

    retries++;
  }
  console.error('Max retries reached without getting a final status');
  throw new Error('최대 재시도 횟수를 초과했습니다.');
}

export async function submitAuthCode(requestId: string, code: string) {
  const { credentials } = getServerAuth();

  try {
    const response = await fetch(`${API_BASE_URL}/platform/auth/${requestId}/code`, {
      method: 'POST',
      body: JSON.stringify({
        auth_code: code,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
    });

    const res = await response.json();

    if (res.success.toLowerCase() !== 'true') {
      throw new Error(
        `인증에 실패했습니다. 인증 코드를 다시 입력해주세요. (${res['detail'][0]['msg']})`
      );
    }

    return {
      success: true,
    };
  } catch (error) {
    throw new Error('인증 중 오류가 발생했습니다.');
  }
}
