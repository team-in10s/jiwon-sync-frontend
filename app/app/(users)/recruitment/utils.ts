import { formatDate } from '@/app/lib/utils';
import { Email } from './types';

export function getEmailStatusMessage(email: Email): string {
  switch (email.status) {
    case 'timeout_rejected':
      return '제안 자동 거절 (72시간 초과)';
    case 'accepted':
      return email.responseDate ? `제안수락 : ${formatDate(email.responseDate)}` : '제안수락';
    case 'rejected':
      return email.responseDate ? `제안 거절 : ${formatDate(email.responseDate)}` : '제안 거절';
    case 'not_scout':
      return '스카우트 제안 아님';
    default:
      return '';
  }
}

export function getEmailReadStatus(email: Email): string {
  if (email.read) {
    const currentTime = new Date();
    const emailTime = new Date(email.date);
    const timeDiff = Math.floor((currentTime.getTime() - emailTime.getTime()) / (1000 * 60 * 60)); // 시간 단위로 계산
    const remainingTime = 72 - timeDiff;
    if (remainingTime > 0) {
      return `응답 대기중 : ${remainingTime}시간 남음`;
    } else {
      return '응답 시간 초과';
    }
  }
  return '';
}

// function formatDate(dateString: string): string {
//   const date = new Date(dateString);
//   return date.toLocaleDateString();
// }
