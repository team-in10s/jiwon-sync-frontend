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
export async function connectEmailPlatformAction(platform: HrPlatformName) {
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

// TODO: refactoring
export async function requestPhoneAuthCode(platform: HrPlatformName) {
  const { credentials } = getServerAuth();

  try {
    // 1
    const response1 = await fetch(`${API_BASE_URL}/platform/auth/${platform}/request`, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
    });

    const res1 = await response1.json();
    console.log('res1? ', res1);
    /*
    {
      message: '인증 요청이 생성되었습니다.',
      request_id: '8b2f04f9-d01f-4777-92c0-38700af00d3e'
    }
    */

    // 2
    const response2 = await fetch(`${API_BASE_URL}/platform/connect/${platform}`, {
      method: 'POST',
      body: JSON.stringify({
        request_id: res1.request_id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
    });

    const res2 = await response2.json();
    console.log('res2? ', res2); // { success: 'False' }

    if (res2.success.toLowerCase() !== 'true') {
      throw new Error('인증 코드를 발송하는 중에 오류가 발생했습니다. (2)');
    }

    if (res2.request_id && res2.status === 'code_sent') {
      return {
        conntectedStatus: 'code_sent', // "인증 번호가 전송되었습니다."
        requestId: res2.request_id,
      };
    }

    if (res2.request_id && res2.status === 'completed') {
      return {
        conntectedStatus: 'completed', // "해당 플랫폼에 이미 생성된 계정이 있습니다. "
        requestId: null,
      };
    }
  } catch (error) {
    throw new Error('플랫폼에 계정 생성 중 오류가 발생했습니다.');
  }
}

// requestPhoneAuthCode 대신에 임시로 사용하는 함수
// request id가 리턴되면 사용자 핸드폰에 인증 코드가 보내졌다는 가정하에 호출하는 함수.
export async function testRequestPhoneAuthCode(platform: HrPlatformName) {
  const { credentials } = getServerAuth();

  let requestId;

  try {
    const response1 = await fetch(`${API_BASE_URL}/platform/auth/${platform}/request`, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
    });

    const res1 = await response1.json();
    console.log('res1? ', res1);
    /*
    {
      message: '인증 요청이 생성되었습니다.',
      request_id: '8b2f04f9-d01f-4777-92c0-38700af00d3e'
    }
    */

    if (res1.detail) {
      throw new Error(res1.detail[0].msg);
    }

    requestId = res1.request_id;
  } catch (error) {
    throw new Error('인증 요청 중에 오류가 발생했습니다.');
  }

  try {
    // fire and forgot
    // 1) 응답이 오래 걸림 2) 요청만으로도 핸드폰에 인증 코드가 발송되지 않을까 하는 추측
    fetch(`${API_BASE_URL}/platform/connect/${platform}`, {
      method: 'POST',
      body: JSON.stringify({
        request_id: requestId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
    });

    return {
      requestId,
    };
  } catch (error) {
    console.log('err? ', error);
    // 일단 아무것도 하지 않음
  }
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
      throw new Error('인증에 실패했습니다. 인증 코드를 다시 입력해주세요.');
    }
  } catch (error) {
    throw new Error('인증 중 오류가 발생했습니다.');
  }
}
