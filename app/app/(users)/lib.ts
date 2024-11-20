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
