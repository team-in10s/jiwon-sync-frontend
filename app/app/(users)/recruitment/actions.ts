'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { AcceptResponse, RejectResponse } from './types';

const baseUrl = process.env.API_BASE_URL;

export async function acceptProposalAction(acceptResponse: AcceptResponse) {
  const cookieStore = await cookies();
  const credentials = cookieStore.get('user_credentials')?.value;

  console.log('baseUrl:', baseUrl);
  const res = await fetch(`${baseUrl}/scout/proposals/${acceptResponse.id}/response`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify({
      action: 'accepted',
      subject: acceptResponse.subject,
      sender: acceptResponse.sender,
      content: acceptResponse.content,
      response_type: acceptResponse.responseType,
      response_content: acceptResponse.responseContent,
      reject_reasons: [],
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to accept the proposal');
  }

  /**
   성공 시, 
    {
        "message": "Scout email processed successfully"
    }

    실패 시, 
   {
    "detail": 
        [
            {
                "loc": [
                        "string",
                        0
                    ],
                "msg": "string",
                "type": "string"
            }
        ]
    }
   */

  revalidatePath('/app/(users)/recruitment');
}

export async function rejectProposalAction(rejectResponse: RejectResponse) {
  const cookieStore = await cookies();
  const credentials = cookieStore.get('user_credentials')?.value;

  console.log('rejectResponse: ', rejectResponse);

  const res = await fetch(`${baseUrl}/scout/proposals/${rejectResponse.id}/response`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify({
      action: 'rejected',
      subject: rejectResponse.subject,
      sender: rejectResponse.sender,
      content: rejectResponse.content,
      response_type: rejectResponse.responseType,
      reject_reasons: rejectResponse.rejectReasons,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to reject the proposal');
  }

  revalidatePath('/app/(users)/recruitment');
}
