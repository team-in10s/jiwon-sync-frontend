// src/lib/get-runtime.ts

import { RuntimeInterface } from './runtime';
import { createWebRuntime } from './web-runtime';
import { createElectronRuntime } from './electron-runtime';

export function getRuntime(): RuntimeInterface {
  if (typeof window !== 'undefined' && window.isDesktopApp) {
    return createElectronRuntime();
  }
  return createWebRuntime();
}
