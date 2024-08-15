import { HrPlatformName } from '@/app/lib/constants';
import { getPlatformStatusService } from './services';

type PlatformStatus = {
  platform: HrPlatformName;
  status: string;
}[];

export async function getPlatformStatusUseCase() {
  const response: Promise<PlatformStatus> = await getPlatformStatusService();
  return response;
}
