// src/lib/runtime.ts

/* eslint-disable */
export interface RuntimeInterface {
  executeSignupScript: (
    task: any,
    userId: string,
    userCredentials: string
  ) => Promise<{ success: boolean; error?: string }>;

  addLowPriorityTask: (task: any) => Promise<{ success: boolean; error?: string }>;
  openApiDocs: () => Promise<{ success: boolean; error?: string }>;
  getApiDocs: () => Promise<any>;
  testApi: (
    apiName: string,

    params: any
  ) => Promise<{ success: boolean; result?: any; error?: string }>;
}
