import { HrPlatformName } from '@/app/lib/constants';

// 기존 아이디로 로그인 시도하는 작업할때 사용할 작업아이디
// 별다른 뜻은 없음. 그저 구분 용
const ORIGINAL_LOGIN_JOB_ID: Partial<Record<HrPlatformName, number>> = {
  incruit: 1030,
  jobkorea: 1031,
  remember: 1032,
  saramin: 1033,
  wanted: 1034,
};

const SIGNUP_PAGE_URLS: Partial<Record<HrPlatformName, string>> = {
  incruit:
    'https://edit.incruit.com/entrance/entrancepersonal.asp?gotoURL=https%3A%2F%2Fwww%2Eincruit%2Ecom%2F',
  jobkorea: 'https://www.jobkorea.co.kr/Join/M_Regist',
  remember: 'https://career.rememberapp.co.kr/job/postings',
  saramin: 'https://www.saramin.co.kr/zf_user/member/registration/join?ut=p',
  wanted: 'https://id.wanted.jobs/login',
};

const LOGIN_PAGE_URLS: Partial<Record<HrPlatformName, string>> = {
  // incruit: 'https://www.incruit.com/login/login.asp',
  incruit: 'https://www.incruit.com/',
  // jobkorea: 'https://www.jobkorea.co.kr/Login/Login_Tot.asp',
  jobkorea: 'https://www.jobkorea.co.kr/',
  // remember: 'https://career.rememberapp.co.kr/job/postings',
  remember: 'https://rememberapp.co.kr/#/e',
  saramin: 'https://www.saramin.co.kr/zf_user/',
  wanted: 'https://www.wanted.co.kr/',
};

const SIGNUP_SCRIPT_URL: Partial<Record<HrPlatformName, string>> = {
  incruit: 'https://d19wfoforqp8p.cloudfront.net/injected-scripts/incruit-signup.js',
  jobkorea: 'https://d19wfoforqp8p.cloudfront.net/injected-scripts/jobkorea-signup.js',
  remember: 'https://d19wfoforqp8p.cloudfront.net/injected-scripts/remember-signup.js',
  saramin: 'https://d19wfoforqp8p.cloudfront.net/injected-scripts/saramin-signup.js',
  wanted: 'https://d19wfoforqp8p.cloudfront.net/injected-scripts/wanted-signup.js',
};

const LOGIN_SCRIPT_URL: Partial<Record<HrPlatformName, string>> = {
  incruit: 'https://d19wfoforqp8p.cloudfront.net/injected-scripts/incruit-login.js',
  jobkorea: 'https://d19wfoforqp8p.cloudfront.net/injected-scripts/jobkorea-login.js',
  remember: 'https://d19wfoforqp8p.cloudfront.net/injected-scripts/remember-login.js',
  saramin: 'https://d19wfoforqp8p.cloudfront.net/injected-scripts/saramin-login.js',
  wanted: 'https://d19wfoforqp8p.cloudfront.net/injected-scripts/wanted-login.js',
};

const DUMMY_SCRAPE_RESUME_URL =
  'https://d19wfoforqp8p.cloudfront.net/injected-scripts/000-resume.js';

export {
  SIGNUP_PAGE_URLS,
  LOGIN_PAGE_URLS,
  SIGNUP_SCRIPT_URL,
  LOGIN_SCRIPT_URL,
  ORIGINAL_LOGIN_JOB_ID,
  DUMMY_SCRAPE_RESUME_URL,
};
