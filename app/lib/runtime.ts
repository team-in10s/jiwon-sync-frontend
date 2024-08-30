// src/lib/runtime.ts

import { HrPlatformName } from './constants';

/* eslint-disable */
export interface RuntimeInterface {
  executeSignupScript: (
    platformName: HrPlatformName,
    userCredentials: string,
    requestId?: string | null
  ) => Promise<any>;
  addLowPriorityTask: (task: any) => Promise<any>;
  openApiDocs: () => Promise<any>;
  getApiDocs: () => Promise<any>;
  testApi: (apiName: string, params: any) => Promise<any>;
}
