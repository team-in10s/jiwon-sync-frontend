// Cookie names
export const USER_COOKIE = 'user';
export const CREDENTIALS_COOKIE = 'user_credentials';

// Platforms
// const PLATFORM_TYPES = {
//   EMAIL_ONLY: 'email_only',
//   PHONE_AUTH: 'phone_auth',
// };

type PlatformType = 'email_only' | 'phone_auth';

interface Term {
  title: string;
  content: string;
  url: string;
}

interface BasicPlatformConfig {
  displayName: string;
  logo: string | null;
}

interface ExtendedPlatformConfig extends BasicPlatformConfig {
  type: PlatformType;
  terms: Term[];
}

type PlatformConfig = BasicPlatformConfig | ExtendedPlatformConfig;

type PLATFORM_CONFIG_TYPE = {
  [key: string]: PlatformConfig;
};

export const PLATFORM_CONFIG: PLATFORM_CONFIG_TYPE = {
  jiwon: { displayName: '지원전에', logo: 'jiwon_logo.png' },
  saramin: { displayName: '사람인', logo: 'saramin_logo.png' },
  jumpit: {
    type: 'email_only',
    displayName: '점핏',
    terms: [
      {
        title: '서비스 이용 약관',
        content: '점핏 서비스 이용 약관 내용...',
        url: 'https://jumpit.co.kr/terms',
      },
      {
        title: '개인정보 처리방침',
        content: '점핏 개인정보 처리방침 내용...',
        url: 'https://jumpit.co.kr/privacy',
      },
    ],
    logo: 'jumpit_logo.png',
  },
  incruit: {
    type: 'phone_auth',
    displayName: '인크루트',
    terms: [
      {
        title: '서비스 이용 약관',
        content: '인크루트 서비스 이용 약관 내용...',
        url: 'https://incruit.com/terms',
      },
      {
        title: '개인정보 처리방침',
        content: '인크루트 개인정보 처리방침 내용...',
        url: 'https://incruit.com/privacy',
      },
    ],
    logo: 'incruit_logo.png',
  },
  jobkorea: { displayName: '잡코리아', logo: 'jobkorea_logo.png' },
  wanted: { displayName: '원티드', logo: 'wanted_logo.png' },
  remember: { displayName: '리멤버', logo: 'remember_logo.png' },
  custom: { displayName: '파일 또는 링크 직접 추가', logo: null },
  // "worknet":{displayName: "워크넷", logo: "worknet_logo.png" },
  //   { name: "linkedIn", displayName: "링크드인", logo: "linkedin_logo.png" },
};

// error messages
const NETWORK_ERROR = '네트워크 오류입니다.';
const AUTH_ERROR = '아이디 또는 비밀번호가 올바르지 않습니다.';
const ACTION_RECHECK = '다시 확인해 주세요.';
const ACTION_RETRY = '잠시 후에 다시 시도해 주세요.';
const ACTION_CS = '고객센터로 문의해 주세요.';

type m = {
  reason: {
    network: typeof NETWORK_ERROR;
    authentication: typeof AUTH_ERROR;
  };
  action: {
    recheck: typeof ACTION_RECHECK;
    retry: typeof ACTION_RETRY;
    cs: typeof ACTION_CS;
  };
};

export const ERROR_MESSAGE: m = {
  reason: {
    network: NETWORK_ERROR,
    authentication: AUTH_ERROR,
  },
  action: {
    recheck: ACTION_RECHECK,
    retry: ACTION_RETRY,
    cs: ACTION_CS,
  },
};
