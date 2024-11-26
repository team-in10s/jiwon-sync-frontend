// 필요한 state
// 바텀 시트 보여주기 여부
// 선택한 카드의 플랫폼과 항목 정보

////////////////////////////////////////////////////////////

type ProfileBeforeSubmit = {
  platform: string; // incruit, remember, saramin, wanted, jobkorea
  isSelected: boolean; // true면 "~~에서 가져왔어요" 로 표시됨
  name: string;
  email: string;
  avatar: string;
  phone: string;
  birthday: string;
  gender: string;
  address: string;
}[];

type SelfIntroductionBeforeSubmit = {
  platform: string;
  isSelected: boolean;
  content: string;
}[];

type WorkExperienceBeforeSubmit = {
  platform: string;
  isSelected: boolean;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrent: boolean;
}[];

type EducationBeforeSubmit = {
  platform: string;
  isSelected: boolean;
  schoolName: string;
  major: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrent: boolean;
}[];

type CertificationBeforeSubmit = {
  platform: string;
  isSelected: boolean;
  name: string;
  date: string;
  description: string;
  issuedBy: string;
}[];

type AwardBeforeSubmit = {
  platform: string;
  isSelected: boolean;
  name: string;
  date: string;
  description: string;
  awardedBy: string;
}[];

type CoursesBeforeSubmit = {
  platform: string;
  isSelected: boolean;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  organization: string;
}[];

////////////////////////////////////////////////////////////

// fake data
// 가짜 데이터 생성

export const fakeProfileData: ProfileBeforeSubmit = [
  {
    platform: 'incruit',
    isSelected: true,
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://example.com/avatar.jpg',
    phone: '010-1234-5678',
    birthday: '1990-01-01',
    gender: 'male',
    address: '123 Main St, Anytown, USA',
  },
  // 추가 데이터...
];

export const fakeSelfIntroductionData: SelfIntroductionBeforeSubmit = [
  {
    platform: 'remember',
    isSelected: false,
    content: 'I am a highly motivated individual with a passion for technology.',
  },
  // 추가 데이터...
];

export const fakeWorkExperienceData: WorkExperienceBeforeSubmit = [
  {
    platform: 'saramin',
    isSelected: true,
    companyName: 'Tech Corp',
    position: 'Software Engineer',
    startDate: '2015-06-01',
    endDate: '2020-08-01',
    description: 'Developed and maintained web applications.',
    isCurrent: false,
  },
  // 추가 데이터...
];

export const fakeEducationData: EducationBeforeSubmit = [
  {
    platform: 'wanted',
    isSelected: true,
    schoolName: 'University of Example',
    major: 'Computer Science',
    degree: "Bachelor's",
    startDate: '2010-09-01',
    endDate: '2014-06-01',
    description: 'Studied various computer science topics.',
    isCurrent: false,
  },
  // 추가 데이터...
];

export const fakeCertificationData: CertificationBeforeSubmit = [
  {
    platform: 'jobkorea',
    isSelected: true,
    name: 'Certified Java Developer',
    date: '2018-05-01',
    description: 'Certification for Java programming skills.',
    issuedBy: 'Oracle',
  },
];

export const fakeAwardData: AwardBeforeSubmit = [
  {
    platform: 'jobkorea',
    isSelected: false,
    name: 'Best Developer Award',
    date: '2019-11-01',
    description: 'Awarded for outstanding performance in software development.',
    awardedBy: 'Tech Corp',
  },
];

export const fakeCoursesData: CoursesBeforeSubmit = [
  {
    platform: 'jobkorea',
    isSelected: true,
    name: 'Advanced React Course',
    startDate: '2020-01-01',
    endDate: '2020-03-01',
    description: 'Completed an advanced course on React.',
    organization: 'Online Learning Platform',
  },
];
