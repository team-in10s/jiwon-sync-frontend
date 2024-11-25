import { formatDate } from '@/app/lib/utils';
import { Email } from './types';

export function getEmailStatusMessage(email: Email): string {
  switch (email.status) {
    case 'timeout_rejected':
      return '제안 자동 거절 (72시간 초과)';
    case 'accepted':
      return email.responseDate ? `제안 수락: ${formatDate(email.responseDate)}` : '제안수락';
    case 'rejected':
      return email.responseDate ? `제안 거절: ${formatDate(email.responseDate)}` : '제안 거절';
    case 'not_scout':
      return '스카우트 제안 아님';
    default:
      return '';
  }
}

function calculateRemainingTimeInMinutes(
  startDate: string,
  endDate: string,
  totalMinutes: number = 72 * 60
): number {
  const startTime = new Date(startDate);
  const endTime = new Date(endDate);
  const timeDiffInMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));
  return totalMinutes - timeDiffInMinutes;
}

export function isTimeExceeded(
  startDate: string,
  endDate: string,
  totalMinutes: number = 72 * 60
): boolean {
  const remainingTimeInMinutes = calculateRemainingTimeInMinutes(startDate, endDate, totalMinutes);
  return remainingTimeInMinutes <= 0;
}

export function getEmailReadStatus(emailDate: string): string {
  const currentTime = new Date().toISOString();
  const remainingTimeInMinutes = calculateRemainingTimeInMinutes(emailDate, currentTime);

  if (remainingTimeInMinutes > 60) {
    const remainingHours = Math.floor(remainingTimeInMinutes / 60);
    return `응답 대기중 : ${remainingHours}시간 남음`;
  } else if (remainingTimeInMinutes > 0) {
    return `응답 대기중 : ${remainingTimeInMinutes}분 남음`;
  } else {
    return '응답 시간 초과';
  }
}

export const calculateTotalPages = (totalEmails: number, emailsPerPage: number = 10): number => {
  return Math.ceil(totalEmails / emailsPerPage);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};
