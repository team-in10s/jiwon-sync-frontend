// app/app/(users)/account-status/utils.ts

type StatusInfo = {
  text: string;
  color: string;
};

export function getStatusInfo(status: string | null): StatusInfo | null {
  switch (status) {
    case 'failed':
      return { text: '실패', color: 'text-red-500' };
    case 'connecting':
      return { text: '생성 중', color: 'text-blue-500' };
    case 'completed':
      return { text: '완료', color: 'text-green-500' };
    default:
      return null;
  }
}
