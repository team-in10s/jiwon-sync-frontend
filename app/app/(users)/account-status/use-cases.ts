import { getPlatformStatusService } from './services';

export async function getPlatformStatusUseCase() {
  const response = await getPlatformStatusService();
  return response;
}
