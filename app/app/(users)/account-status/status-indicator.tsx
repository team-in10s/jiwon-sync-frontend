// app/app/(users)/account-status/components/status-indicator.tsx

import { getStatusInfo } from './utils';

type StatusIndicatorProps = {
  status: string | null;
};

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  const statusInfo = getStatusInfo(status);

  if (!statusInfo) return null;

  return <span className={`font-medium ${statusInfo.color}`}>{statusInfo.text}</span>;
}
