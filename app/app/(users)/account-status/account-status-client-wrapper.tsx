import { PlatformStatusItem } from './types';
import { getPlatformStatusUseCase } from './use-cases';
import AccountStatusClient from './account-status-client';

export async function AccountStatusClientWrapper() {
  const initialAccountStatus: PlatformStatusItem[] = await getPlatformStatusUseCase();

  return <AccountStatusClient initialStatus={initialAccountStatus} />;
}
