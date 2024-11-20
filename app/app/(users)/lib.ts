import { HrPlatformName } from '@/app/lib/constants';

export async function originalLoginFunction(
  originalId: string,
  originalPw: string,
  currentPlatform: HrPlatformName,
  loginScriptUrl: string
) {
  const payload = {
    platform_id: originalId,
    platform_pw: originalPw,
  };

  const script = document.createElement('script');
  script.src = loginScriptUrl;
  document.body.appendChild(script);

  await new Promise((resolve) => (script.onload = resolve));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return await (window as any).jiwonRunScript(payload);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertIIFEString = <T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): string => {
  // Convert function to string
  const fnString = fn.toString();

  // Convert arguments to JSON string to embed in the function call
  const argsString = args.map((arg) => JSON.stringify(arg)).join(', ');

  // Wrap function and call it with arguments as an IIFE
  return `(${fnString})(${argsString})`;
};
