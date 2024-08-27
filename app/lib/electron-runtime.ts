// src/lib/electron-runtime.ts

import { RuntimeInterface } from './runtime';

/* eslint-disable */
export function createElectronRuntime(): RuntimeInterface {
  return {
    executeSignupScript: (task: any, userId: string, userCredentials: string) =>
      window.desktopAppAPI.executeSignupScript({ task, userId, userCredentials }),
    addLowPriorityTask: (task: any) => window.desktopAppAPI.addLowPriorityTask(task),
    openApiDocs: () => window.desktopAppAPI.openApiDocs(),
    getApiDocs: () => window.desktopAppAPI.getApiDocs(),

    testApi: (apiName: string, params: any) => window.desktopAppAPI.testApi(apiName, params),
  };
}
