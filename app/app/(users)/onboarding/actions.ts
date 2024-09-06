// app/app/(users)/onboarding/actions.ts

'use server';

import { HrPlatformName } from '@/app/lib/constants';
import { getServerAuth } from '@/app/lib/server-auth';
import { baseFetch, getAuthHeaders } from '@/app/lib/base-api-client';

// TODO: refactoring
export async function createAccountWithEmailAction(platform: HrPlatformName) {
  const { credentials } = getServerAuth();

  if (!credentials) {
    throw new Error('User is not authenticated');
  }

  try {
    const result = await baseFetch(`/platform/connect/${platform}`, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        ...getAuthHeaders(credentials),
      },
    });

    console.log('createAccountWithEmailAction response:', result);

    return result;
  } catch (error) {
    console.error('Error in createAccountWithEmailAction:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to create account: ${error.message}`);
    }
    throw new Error('An unknown error occurred while creating the account');
  }
}

type RequestIdResponse = {
  message: string;
  request_id: string;
};

export async function getRequestId(platform: HrPlatformName): Promise<string> {
  const { credentials } = getServerAuth();

  try {
    const result = await baseFetch<RequestIdResponse>(`/platform/auth/${platform}/request`, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        ...getAuthHeaders(credentials),
      },
    });

    console.log('getRequestId response:', result);

    return result.request_id;
  } catch (error) {
    console.error('Error in getRequestId:', error);
    throw new Error('인증 요청에 실패하였습니다. (getRequestId)');
  }
}

type ConnectResponse = {
  msg: string;
};

export async function connectPhonePlatform(
  requestId: string,
  platform: HrPlatformName
): Promise<ConnectResponse> {
  const { credentials } = getServerAuth();

  if (!credentials) {
    throw new Error('User is not authenticated');
  }

  try {
    const result = await baseFetch<ConnectResponse>(`/platform/connect/${platform}`, {
      method: 'POST',
      body: JSON.stringify({
        request_id: requestId,
      }),
      headers: {
        ...getAuthHeaders(credentials),
      },
    });

    console.log('connectPhonePlatform response:', result);

    return result;
  } catch (error) {
    console.error('Error in connectPhonePlatform:', error);
    throw new Error('계정 생성에 실패하였습니다. (connect)');
  }
}

type SubmitAuthCodeResponse = {
  success: string;
  detail?: Array<{ msg: string }>;
};

// NODE: db 에 인증코드 저장만함 (인증 코드 맞는지 아닌지 확인하는 부분 x)
export async function submitAuthCode(
  requestId: string,
  code: string
): Promise<{ success: boolean }> {
  const { credentials } = getServerAuth();

  if (!credentials) {
    throw new Error('User is not authenticated');
  }

  try {
    const res = await baseFetch<SubmitAuthCodeResponse>(`/platform/auth/${requestId}/code`, {
      method: 'POST',
      body: JSON.stringify({
        auth_code: code,
      }),
      headers: {
        ...getAuthHeaders(credentials),
      },
    });

    if (res.success.toLowerCase() !== 'true') {
      const errorMessage = res.detail && res.detail[0] ? res.detail[0].msg : '알 수 없는 오류';
      throw new Error(`인증에 실패했습니다. 인증 코드를 다시 입력해주세요. (${errorMessage})`);
    }

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      // If it's our custom error, rethrow it
      if (error.message.startsWith('인증에 실패했습니다.')) {
        throw error;
      }
    }
    // For any other errors, throw a generic error
    throw new Error('인증 중 오류가 발생했습니다.');
  }
}

const formMessageConnectOrigin = (msg?: string) => {
  if (msg === 'ID/PW incorrect') return '아이디 또는 비밀번호를 다시 확인해 주세요.';
  if (msg === 'Server Error') return '로그인에 실패했어요. 잠시 후 다시 시도해 주세요.';
  return '알 수 없는 오류입니다. 카카오톡 고객센터로 문의해 주세요.';
};

export async function connectOrigin(platform: HrPlatformName, id: string, pw: string) {
  const { credentials } = getServerAuth();

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
  const result = await response.json(); //  { msg: "ID/PW incorrect", success: false }

  if (!result.success) {
    throw new Error(`${formMessageConnectOrigin(result.msg)}`);
  }

  return result; // {success: 'true'}
}
