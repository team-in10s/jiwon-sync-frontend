// src/lib/web-runtime.ts

import { RuntimeInterface } from './runtime';

export function createWebRuntime(): RuntimeInterface {
  return {
    async executeSignupScript() {
      console.warn('Signup script execution is not available in web environment');
      return { success: false, error: 'Not available in web environment' };
    },
    async addLowPriorityTask() {
      console.warn('Low priority tasks are not available in web environment');
      return { success: false, error: 'Not available in web environment' };
    },
    async openApiDocs() {
      console.warn('API docs are not available in web environment');
      return { success: false, error: 'Not available in web environment' };
    },
    async getApiDocs() {
      console.warn('API docs are not available in web environment');
      return null;
    },
    async testApi() {
      console.warn('API testing is not available in web environment');
      return { success: false, error: 'Not available in web environment' };
    },
  };
}
