import { HrPlatformName } from '@/app/lib/constants';

export type PlatformStatusItem = {
  platform: HrPlatformName;
  status: string | null;
};
