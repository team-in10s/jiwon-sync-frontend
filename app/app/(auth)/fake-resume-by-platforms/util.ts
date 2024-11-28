import { HrPlatformName } from '@/app/lib/constants';

export async function scrapeResumeData(scriptUrl: string) {
  const script = document.createElement('script');
  script.src = scriptUrl;
  document.body.appendChild(script);

  await new Promise((resolve) => (script.onload = resolve));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return await (window as any).jiwonRunScript();
}

////////////////////////////////////////////////////////////
// mapper & types

interface BaseScrapResult {
  type: 'scrapResult';
  payload: {
    success: boolean;
    platform: Exclude<HrPlatformName, 'jumpit'>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  };
}

// 통합된 이력서 데이터 타입 정의
interface MergedResumeData {
  resume_experiences: Array<ResumeExperience>;
  resume_certificates: Array<ResumeCertificate>;
  resume_educations: Array<ResumeEducation>;
  resume_languages: Array<ResumeLanguage>;
  resume_employment_preferences: Array<ResumeEmploymentPreference>;
  resume_profile: Array<ResumeProfile>;
}

interface BaseResumeItem {
  platform: Exclude<HrPlatformName, 'jumpit'>;
  is_selected: boolean;
  is_null: boolean;
}

interface ResumeExperience extends BaseResumeItem {
  company_name?: string;
  start_year?: string;
  start_month?: string;
  end_year?: string;
  end_month?: string;
  is_current?: boolean;
  job_title?: string;
  department?: string;
  responsibilities?: string;
  work_type?: string;
  salary?: string;
  industry_type?: string;
  company_size?: string;
  company_type?: string;
}

interface ResumeCertificate extends BaseResumeItem {
  certificate_name?: string;
  issuer?: string;
  acquisition_year?: string;
  acquisition_month?: string;
}

interface ResumeEducation extends BaseResumeItem {
  school_name?: string;
  major?: string;
  start_year?: string;
  end_year?: string;
  education_level?: string;
  graduation_status?: string;
}

interface ResumeLanguage extends BaseResumeItem {
  language?: string;
  speaking_level?: string;
  test_name?: string;
  score?: string;
}

interface ResumeEmploymentPreference extends BaseResumeItem {
  desired_location?: string;
  work_type?: string;
  desired_salary?: string;
  remote_work?: boolean;
}

interface ResumeProfile extends BaseResumeItem {
  resume_title?: string;
  name?: string;
  email?: string;
  phone_number?: string;
  total_experience_years?: number;
}

// 매핑 함수
export function mapToMergedFormat(scrapResults: BaseScrapResult[]): MergedResumeData {
  const mergedData: MergedResumeData = {
    resume_experiences: [],
    resume_certificates: [],
    resume_educations: [],
    resume_languages: [],
    resume_employment_preferences: [],
    resume_profile: [],
  };

  // 모든 플랫폼에 대해 빈 employment preferences 생성
  const allPlatforms: Exclude<HrPlatformName, 'jumpit'>[] = [
    'jobkorea',
    'incruit',
    'wanted',
    'saramin',
    'remember',
  ];
  mergedData.resume_employment_preferences = allPlatforms.map((platform) => ({
    platform,
    is_selected: false,
    is_null: true,
  }));

  // 각 스크랩 결과를 순회하며 데이터 통합
  scrapResults.forEach((result) => {
    const platform = result.payload.platform;
    const data = result.payload.data;

    // 경력 정보 매핑
    if (data.resume_experiences) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const experiences = data.resume_experiences.map((exp: any) => ({
        ...exp,
        platform,
        is_selected: false,
        is_null: false,
      }));
      mergedData.resume_experiences.push(...experiences);
    }

    // 자격증 정보 매핑
    if (data.resume_certificates) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const certificates = data.resume_certificates.map((cert: any) => ({
        ...cert,
        platform,
        is_selected: false,
        is_null: false,
      }));
      mergedData.resume_certificates.push(...certificates);
    } else {
      mergedData.resume_certificates.push({
        platform,
        is_selected: false,
        is_null: true,
      });
    }

    // 학력 정보 매핑
    if (data.resume_educations) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const educations = data.resume_educations.map((edu: any) => ({
        ...edu,
        platform,
        is_selected: false,
        is_null: false,
      }));
      mergedData.resume_educations.push(...educations);
    } else {
      mergedData.resume_educations.push({
        platform,
        is_selected: false,
        is_null: true,
      });
    }

    // 어학 정보 매핑
    if (data.resume_languages) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const languages = data.resume_languages.map((lang: any) => ({
        ...lang,
        platform,
        is_selected: false,
        is_null: false,
      }));
      mergedData.resume_languages.push(...languages);
    } else {
      mergedData.resume_languages.push({
        platform,
        is_selected: false,
        is_null: true,
      });
    }

    // 희망 근무조건 매핑
    const existingPrefIndex = mergedData.resume_employment_preferences.findIndex(
      (pref) => pref.platform === platform
    );

    if (data.resume_employment_preferences) {
      const preferences = {
        ...data.resume_employment_preferences[0],
        platform,
        is_selected: false,
        is_null: false,
      };
      if (existingPrefIndex !== -1) {
        mergedData.resume_employment_preferences[existingPrefIndex] = preferences;
      }
    }

    // 프로필 정보 매핑
    const profileData = {
      resume_title: data.resume_title,
      name: data.name,
      email: data.email,
      phone_number: data.phone_number,
      total_experience_years: data.total_experience_years,
      platform,
      is_selected: false,
      is_null: false,
    };
    mergedData.resume_profile.push(profileData);
  });

  return selectBestItems(mergedData);
}

// 선택 로직
function selectBestItems(mergedData: MergedResumeData): MergedResumeData {
  return {
    ...mergedData,
    resume_profile: selectProfiles(mergedData.resume_profile),
    resume_experiences: selectExperiences(mergedData.resume_experiences),
    resume_certificates: selectCertificates(mergedData.resume_certificates),
    resume_educations: selectEducations(mergedData.resume_educations),
    resume_languages: selectLanguages(mergedData.resume_languages),
    resume_employment_preferences: selectPreferences(mergedData.resume_employment_preferences),
  };
}

function selectProfiles(profiles: ResumeProfile[]): ResumeProfile[] {
  const validProfiles = profiles.filter((p) => !p.is_null);
  if (validProfiles.length === 0) return profiles;

  // 가장 높은 경력년수를 가진 프로필 찾기
  const maxExperience = Math.max(...validProfiles.map((p) => p.total_experience_years || 0));

  let result = profiles.map((profile) => ({
    ...profile,
    is_selected: !profile.is_null && profile.total_experience_years === maxExperience,
  }));

  // is_selected가 모두 false인 경우 체크
  const hasSelectedProfile = result.some((profile) => profile.is_selected);

  if (!hasSelectedProfile && validProfiles.length > 0) {
    // is_null이 false인 첫 번째 프로필을 선택
    const firstValidIndex = result.findIndex((profile) => !profile.is_null);
    result = result.map((profile, index) => ({
      ...profile,
      is_selected: index === firstValidIndex,
    }));
  }

  return result;
}

function selectExperiences(experiences: ResumeExperience[]): ResumeExperience[] {
  const validExperiences = experiences.filter((e) => !e.is_null);
  if (validExperiences.length === 0) return experiences;

  let result = experiences.map((exp) => ({
    ...exp,
    is_selected: !exp.is_null && Boolean(exp.is_current || exp.department || exp.responsibilities),
  }));

  const hasSelectedExperience = result.some((exp) => exp.is_selected);

  if (!hasSelectedExperience && validExperiences.length > 0) {
    const firstValidIndex = result.findIndex((exp) => !exp.is_null);
    result = result.map((exp, index) => ({
      ...exp,
      is_selected: index === firstValidIndex,
    }));
  }

  return result;
}

function selectCertificates(certificates: ResumeCertificate[]): ResumeCertificate[] {
  const validCertificates = certificates.filter((c) => !c.is_null);
  if (validCertificates.length === 0) return certificates;

  let result = certificates.map((cert) => ({
    ...cert,
    is_selected: !cert.is_null && cert.acquisition_year !== undefined && cert.issuer !== undefined,
  }));

  const hasSelectedCertificate = result.some((cert) => cert.is_selected);

  if (!hasSelectedCertificate && validCertificates.length > 0) {
    const firstValidIndex = result.findIndex((cert) => !cert.is_null);
    result = result.map((cert, index) => ({
      ...cert,
      is_selected: index === firstValidIndex,
    }));
  }

  return result;
}

function selectEducations(educations: ResumeEducation[]): ResumeEducation[] {
  const validEducations = educations.filter((e) => !e.is_null);
  if (validEducations.length === 0) return educations;

  let result = educations.map((edu) => ({
    ...edu,
    is_selected:
      !edu.is_null && Boolean(edu.graduation_status === '졸업' && edu.school_name && edu.major),
  }));

  const hasSelectedEducation = result.some((edu) => edu.is_selected);

  if (!hasSelectedEducation && validEducations.length > 0) {
    const firstValidIndex = result.findIndex((edu) => !edu.is_null);
    result = result.map((edu, index) => ({
      ...edu,
      is_selected: index === firstValidIndex,
    }));
  }

  return result;
}

function selectLanguages(languages: ResumeLanguage[]): ResumeLanguage[] {
  const validLanguages = languages.filter((l) => !l.is_null);
  if (validLanguages.length === 0) return languages;

  let result = languages.map((lang) => ({
    ...lang,
    is_selected: !lang.is_null && Boolean((lang.test_name && lang.score) || lang.speaking_level),
  }));

  const hasSelectedLanguage = result.some((lang) => lang.is_selected);

  if (!hasSelectedLanguage && validLanguages.length > 0) {
    const firstValidIndex = result.findIndex((lang) => !lang.is_null);
    result = result.map((lang, index) => ({
      ...lang,
      is_selected: index === firstValidIndex,
    }));
  }

  return result;
}

function selectPreferences(
  preferences: ResumeEmploymentPreference[]
): ResumeEmploymentPreference[] {
  const validPreferences = preferences.filter((p) => !p.is_null);
  if (validPreferences.length === 0) return preferences;

  let result = preferences.map((pref) => ({
    ...pref,
    is_selected:
      !pref.is_null && pref.desired_location !== undefined && pref.desired_salary !== undefined,
  }));

  const hasSelectedPreference = result.some((pref) => pref.is_selected);

  if (!hasSelectedPreference && validPreferences.length > 0) {
    const firstValidIndex = result.findIndex((pref) => !pref.is_null);
    result = result.map((pref, index) => ({
      ...pref,
      is_selected: index === firstValidIndex,
    }));
  }

  return result;
}
