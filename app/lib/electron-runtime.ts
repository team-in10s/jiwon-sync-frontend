// src/lib/electron-runtime.ts

import { RuntimeInterface } from './runtime';
import { HrPlatformName } from './constants';

/* eslint-disable */
export function createElectronRuntime(): RuntimeInterface {
  return {
    executeSignupScript: (
      platformName: HrPlatformName,
      userCredentials: string,
      requestId?: string | null
    ) => window.desktopAppAPI.executeSignupScript(platformName, userCredentials, requestId),
    addLowPriorityTask: (task: any) => window.desktopAppAPI.addLowPriorityTask(task),
    openApiDocs: () => window.desktopAppAPI.openApiDocs(),
    getApiDocs: () => window.desktopAppAPI.getApiDocs(),
    testApi: (apiName: string, params: any) => window.desktopAppAPI.testApi(apiName, params),
  };
}
