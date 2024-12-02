import { HrPlatformName } from '@/app/lib/constants';

// 통합된 이력서 데이터 타입 정의
export type MergedResumeData = {
  resumeExperiences: Array<ResumeExperience>;
  resumeCertificates: Array<ResumeCertificate>;
  resumeEducations: Array<ResumeEducation>;
  resumeProfile: Array<ResumeProfile>;

  resumeLanguages: Array<ResumeLanguage>;
  resumeEmploymentPreferences: Array<ResumeEmploymentPreference>;
};

interface BaseResumeItem {
  platform: Exclude<HrPlatformName, 'jumpit'>;
  isSelected: boolean;
  isNull: boolean;
}

export interface ResumeExperience extends BaseResumeItem {
  companyName?: string;
  startYear?: string;
  startMonth?: string;
  endYear?: string;
  endMonth?: string;
  isCurrent?: boolean;
  jobTitle?: string;
  department?: string;
  responsibilities?: string;
  workType?: string;
  salary?: string;
  industryType?: string;
  companySize?: string;
  companyType?: string;
}

export interface ResumeCertificate extends BaseResumeItem {
  certificateName?: string;
  issuer?: string;
  acquisitionYear?: string;
  acquisitionMonth?: string;
}

export interface ResumeEducation extends BaseResumeItem {
  schoolName?: string;
  major?: string;
  startYear?: string;
  endYear?: string;
  educationLevel?: string;
  graduationStatus?: string;
}

export interface ResumeLanguage extends BaseResumeItem {
  language?: string;
  speakingLevel?: string;
  testName?: string;
  score?: string;
}

export interface ResumeEmploymentPreference extends BaseResumeItem {
  desiredLocation?: string;
  workType?: string;
  desiredSalary?: string;
  remoteWork?: boolean;
}

export interface ResumeProfile extends BaseResumeItem {
  resumeTitle?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  totalExperienceYears?: number;
}
