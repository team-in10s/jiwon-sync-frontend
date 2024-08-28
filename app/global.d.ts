// app/global.d.ts

/* eslint-disable */
interface Window {
  // Facebook Pixel
  fbq: any;

  // New declarations for Electron
  isDesktopApp?: boolean;
  desktopAppAPI?: any;
  //   desktopAppAPI?: {
  //     executeSignupScript: (args: {
  //       task: any;
  //       userId: string;
  //       userCredentials: string;
  //     }) => Promise<{ success: boolean; error?: string }>;
  //     addLowPriorityTask: (task: any) => Promise<{ success: boolean; error?: string }>;
  //     openApiDocs: () => Promise<{ success: boolean; error?: string }>;
  //     getApiDocs: () => Promise<any>;
  //     testApi: (
  //       apiName: string,
  //       params: any
  //     ) => Promise<{ success: boolean; result?: any; error?: string }>;
  //   };
}
