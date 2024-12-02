import { HrPlatformName } from '@/app/lib/constants';
import {
  MergedResumeData,
  ResumeCertificate,
  ResumeEducation,
  ResumeEmploymentPreference,
  ResumeExperience,
  ResumeLanguage,
  ResumeProfile,
} from './types';

export const NUMBER_TO_KOREAN = [
  '첫번째',
  '두번째',
  '세번째',
  '네번째',
  '다섯번째',
  '여섯번째',
  '일곱번째',
  '여덟번째',
  '아홉번째',
  '열번째',
];

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
  type: string;
  payload: {
    success: boolean;
    platform: Exclude<HrPlatformName, 'jumpit'>;
    data: {
      resume_title?: string;
      name: string;
      email?: string;
      phone_number?: string;
      total_experience_years?: number;
      resume_experiences?: {
        company_name: string;
        start_year?: string;
        start_month?: string;
        end_year?: string;
        end_month?: string;
        job_title?: string;
        responsibilities?: string;
        is_current?: boolean;
        department?: string;
        work_type?: string;
        salary?: string;
        industry_type?: string;
        company_size?: string;
        company_type?: string;
      }[];
      resume_educations?: {
        school_name: string;
        major: string;
        start_year?: string;
        end_year?: string;
        education_level?: string;
        graduation_status?: string;
      }[];
      resume_certificates?: {
        certificate_name: string;
        issuer?: string;
        acquisition_year?: string;
        acquisition_month?: string;
      }[];
      resume_employment_preferences?: {
        desired_location?: string;
        work_type?: string;
        desired_salary?: string;
        remote_work?: boolean;
      }[];
      resume_languages?: {
        language?: string;
        speaking_level?: string;
        test_name?: string;
        score?: string;
      }[];
    };
  };
}

// 매핑 함수
export function mapToMergedFormat(scrapResults: BaseScrapResult[]): MergedResumeData {
  const mergedData: MergedResumeData = {
    resumeExperiences: [],
    resumeCertificates: [],
    resumeEducations: [],
    resumeLanguages: [],
    resumeEmploymentPreferences: [],
    resumeProfile: [],
  };

  // 모든 플랫폼에 대해 빈 employment preferences 생성
  const allPlatforms: Exclude<HrPlatformName, 'jumpit'>[] = [
    'jobkorea',
    'incruit',
    'wanted',
    'saramin',
    'remember',
  ];
  mergedData.resumeEmploymentPreferences = allPlatforms.map((platform) => ({
    platform,
    isSelected: false,
    isNull: true,
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
        companyName: exp.company_name,
        startYear: exp.start_year,
        startMonth: exp.start_month,
        endYear: exp.end_year,
        endMonth: exp.end_month,
        isCurrent: exp.is_current,
        jobTitle: exp.job_title,
        department: exp.department,
        responsibilities: exp.responsibilities,
        workType: exp.work_type,
        salary: exp.salary,
        industryType: exp.industry_type,
        companySize: exp.company_size,
        companyType: exp.company_type,
        platform,
        isSelected: false,
        isNull: false,
      }));
      mergedData.resumeExperiences.push(...experiences);
    } else {
      mergedData.resumeExperiences.push({
        platform,
        isSelected: false,
        isNull: true,
      });
    }

    // 자격증 정보 매핑
    if (data.resume_certificates) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const certificates = data.resume_certificates.map((cert: any) => ({
        certificateName: cert.certificate_name,
        issuer: cert.issuer,
        acquisitionYear: cert.acquisition_year,
        acquisitionMonth: cert.acquisition_month,
        platform,
        isSelected: false,
        isNull: false,
      }));
      mergedData.resumeCertificates.push(...certificates);
    } else {
      mergedData.resumeCertificates.push({
        platform,
        isSelected: false,
        isNull: true,
      });
    }

    // 학력 정보 매핑
    if (data.resume_educations) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const educations = data.resume_educations.map((edu: any) => ({
        schoolName: edu.school_name,
        major: edu.major,
        startYear: edu.start_year,
        endYear: edu.end_year,
        educationLevel: edu.education_level,
        graduationStatus: edu.graduation_status,
        platform,
        isSelected: false,
        isNull: false,
      }));
      mergedData.resumeEducations.push(...educations);
    } else {
      mergedData.resumeEducations.push({
        platform,
        isSelected: false,
        isNull: true,
      });
    }

    // 어학 정보 매핑
    if (data.resume_languages) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const languages = data.resume_languages.map((lang: any) => ({
        language: lang.language,
        speakingLevel: lang.speaking_level,
        testName: lang.test_name,
        score: lang.score,
        platform,
        isSelected: false,
        isNull: false,
      }));
      mergedData.resumeLanguages.push(...languages);
    } else {
      mergedData.resumeLanguages.push({
        platform,
        isSelected: false,
        isNull: true,
      });
    }

    // 희망 근무조건 매핑
    if (data.resume_employment_preferences) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const preferences = data.resume_employment_preferences.map((pref: any) => ({
        desiredLocation: pref.desired_location,
        workType: pref.work_type,
        desiredSalary: pref.desired_salary,
        remoteWork: pref.remote_work,
        platform,
        isSelected: false,
        isNull: false,
      }));

      mergedData.resumeEmploymentPreferences.push(...preferences);
    } else {
      mergedData.resumeEmploymentPreferences.push({
        platform,
        isSelected: false,
        isNull: true,
      });
    }

    // 프로필 정보 매핑
    const profileData = {
      resumeTitle: data.resume_title,
      name: data.name,
      email: data.email,
      phoneNumber: data.phone_number,
      totalExperienceYears: data.total_experience_years,
      platform,
      isSelected: false,
      isNull: false,
    };
    mergedData.resumeProfile.push(profileData);
  });

  return selectBestItems(mergedData);
}

// 선택 로직
function selectBestItems(mergedData: MergedResumeData): MergedResumeData {
  return {
    ...mergedData,
    resumeProfile: selectProfiles(mergedData.resumeProfile),
    resumeExperiences: selectExperiences(mergedData.resumeExperiences),
    resumeCertificates: selectCertificates(mergedData.resumeCertificates),
    resumeEducations: selectEducations(mergedData.resumeEducations),
    resumeLanguages: selectLanguages(mergedData.resumeLanguages),
    resumeEmploymentPreferences: selectPreferences(mergedData.resumeEmploymentPreferences),
  };
}

function selectProfiles(profiles: ResumeProfile[]): ResumeProfile[] {
  const validProfiles = profiles.filter((p) => !p.isNull);
  if (validProfiles.length === 0) return profiles;

  // 가장 높은 경력년수를 가진 프로필 찾기
  const maxExperience = Math.max(...validProfiles.map((p) => p.totalExperienceYears || 0));

  let result = profiles.map((profile) => ({
    ...profile,
    isSelected: !profile.isNull && profile.totalExperienceYears === maxExperience,
  }));

  // is_selected가 모두 false인 경우 체크
  const hasSelectedProfile = result.some((profile) => profile.isSelected);

  if (!hasSelectedProfile && validProfiles.length > 0) {
    // is_null이 false인 첫 번째 프로필을 선택
    const firstValidIndex = result.findIndex((profile) => !profile.isNull);
    result = result.map((profile, index) => ({
      ...profile,
      isSelected: index === firstValidIndex,
    }));
  }

  return result;
}

// 같은 이름의 회사에 대해 가장 긴 responsibilities의 요소를 선택(isSelected = true)
// 유니크한 이름의 회사는 무조건 선택(isSelected = true)
function selectExperiences(experiences: ResumeExperience[]): ResumeExperience[] {
  // 회사 이름별로 그룹화
  const groupedByCompany: Record<string, ResumeExperience[]> = experiences.reduce(
    (acc, exp) => {
      if (!exp.isNull) {
        const companyName = exp.companyName || 'Unknown';
        if (!acc[companyName]) {
          acc[companyName] = [];
        }
        acc[companyName].push(exp);
      }
      return acc;
    },
    {} as Record<string, ResumeExperience[]>
  );

  const selectedExperiences: ResumeExperience[] = [];

  // 각 회사 내에서 가장 긴 responsibilities의 요소를 선택
  for (const companyName in groupedByCompany) {
    const experiences = groupedByCompany[companyName];
    let selectedExperience = experiences[0];

    experiences.forEach((exp) => {
      if (
        exp.responsibilities &&
        selectedExperience.responsibilities &&
        exp.responsibilities.length > selectedExperience.responsibilities.length
      ) {
        selectedExperience = exp;
      }
    });

    selectedExperiences.push(
      ...experiences.map((exp) => ({
        ...exp,
        isSelected: exp === selectedExperience,
      }))
    );
  }

  // Add experiences with isNull = true
  const nullExperiences = experiences.filter((exp) => exp.isNull);
  selectedExperiences.push(...nullExperiences);

  return selectedExperiences;
}

// 자격증 이름별로 그룹화
// 각 자격증 이름에 대해 각 issuer, acquisitionYear, acquisitionMonth가 모두 정의된 자격증 선택 (isSelected = true)
//   (모든 자격증이 issuer, acquisitionYear, acquisitionMonth를 갖고 있으면 그냥 첫번째 요소 선택)
// 유니크한 이름의 자격증은 무조건 선택 (isSelected = true)
function selectCertificates(certificates: ResumeCertificate[]): ResumeCertificate[] {
  // 자격증 이름별로 그룹화
  const groupedByCertificate: Record<string, ResumeCertificate[]> = certificates.reduce(
    (acc, cert) => {
      if (!cert.isNull) {
        const certificateName = cert.certificateName || 'Unknown';
        if (!acc[certificateName]) {
          acc[certificateName] = [];
        }
        acc[certificateName].push(cert);
      }
      return acc;
    },
    {} as Record<string, ResumeCertificate[]>
  );

  const selectedCertificates: ResumeCertificate[] = [];

  // 각 자격증 이름에 대해 각 issuer, acquisitionYear, acquisitionMonth가 모두 정의된 자격증 선택 (isSelected = true)
  //   (모든 자격증이 issuer, acquisitionYear, acquisitionMonth를 갖고 있으면 그냥 첫번째 요소 선택)
  // 유니크한 이름의 자격증은 무조건 선택 (isSelected = true)
  for (const certificateName in groupedByCertificate) {
    const certificates = groupedByCertificate[certificateName];
    let selectedCertificate = certificates.find(
      (cert) =>
        cert.issuer !== undefined &&
        cert.acquisitionYear !== undefined &&
        cert.acquisitionMonth !== undefined
    );

    if (!selectedCertificate) {
      selectedCertificate = certificates[0];
    }

    selectedCertificates.push(
      ...certificates.map((cert) => ({
        ...cert,
        isSelected: cert === selectedCertificate,
      }))
    );
  }

  // Add certificates with isNull = true
  const nullCertificates = certificates.filter((cert) => cert.isNull);
  selectedCertificates.push(...nullCertificates);

  return selectedCertificates;
}

// 같은 이름의 학교에 대해 각 startYear와 endYear가 모두 정의된 학교 선택 (isSelected = true)
//   (모든 학교가 startYear, endYear를 갖고 있으먄 그냥 첫번째 요소 선택)
// 유니크한 이름의 학교는 무조건 선택 (isSelected = true)
function selectEducations(educations: ResumeEducation[]): ResumeEducation[] {
  // 학교 이름별로 그룹화
  const groupedBySchool: Record<string, ResumeEducation[]> = educations.reduce(
    (acc, edu) => {
      if (!edu.isNull) {
        const schoolName = edu.schoolName || 'Unknown';
        if (!acc[schoolName]) {
          acc[schoolName] = [];
        }
        acc[schoolName].push(edu);
      }
      return acc;
    },
    {} as Record<string, ResumeEducation[]>
  );

  const selectedEducations: ResumeEducation[] = [];

  // 각 startYear와 endYear가 모두 정의된 학교 선택 (isSelected = true)
  //   (모든 학교가 startYear, endYear를 갖고 있으먄 그냥 첫번째 요소 선택)
  // 유니크한 이름의 학교는 무조건 선택 (isSelected = true)
  for (const schoolName in groupedBySchool) {
    const educations = groupedBySchool[schoolName];
    let selectedEducation = educations.find(
      (edu) => edu.startYear !== undefined && edu.endYear !== undefined
    );

    if (!selectedEducation) {
      selectedEducation = educations[0];
    }

    selectedEducations.push(
      ...educations.map((edu) => ({
        ...edu,
        isSelected: edu === selectedEducation,
      }))
    );
  }

  // Add educations with isNull = true
  const nullEducations = educations.filter((edu) => edu.isNull);
  selectedEducations.push(...nullEducations);

  return selectedEducations;
}

// 언어 language별로 그룹화
function selectLanguages(languages: ResumeLanguage[]): ResumeLanguage[] {
  // 언어 language별로 그룹화
  const groupedByLanguage: Record<string, ResumeLanguage[]> = languages.reduce(
    (acc, lang) => {
      if (!lang.isNull) {
        const language = lang.language || 'Unknown';
        if (!acc[language]) {
          acc[language] = [];
        }
        acc[language].push(lang);
      }
      return acc;
    },
    {} as Record<string, ResumeLanguage[]>
  );

  const selectedLanguages: ResumeLanguage[] = [];

  // 각 language에 대해 testName이 정의된 언어 선택 (isSelected = true)
  // 유니크한 이름의 언어는 무조건 선택 (isSelected = true)
  for (const language in groupedByLanguage) {
    const languages = groupedByLanguage[language];
    let selectedLanguage = languages.find((lang) => lang.testName !== undefined);

    if (!selectedLanguage) {
      selectedLanguage = languages[0];
    }

    selectedLanguages.push(
      ...languages.map((lang) => ({
        ...lang,
        isSelected: lang === selectedLanguage,
      }))
    );
  }

  // Add languages with isNull = true
  const nullLanguages = languages.filter((lang) => lang.isNull);
  selectedLanguages.push(...nullLanguages);

  return selectedLanguages;
}

function selectPreferences(
  preferences: ResumeEmploymentPreference[]
): ResumeEmploymentPreference[] {
  const validPreferences = preferences.filter((p) => !p.isNull);
  if (validPreferences.length === 0) return preferences;

  let result = preferences.map((pref) => ({
    ...pref,
    isSelected:
      !pref.isNull && pref.desiredLocation !== undefined && pref.desiredSalary !== undefined,
  }));

  const hasSelectedPreference = result.some((pref) => pref.isSelected);

  if (!hasSelectedPreference && validPreferences.length > 0) {
    const firstValidIndex = result.findIndex((pref) => !pref.isNull);
    result = result.map((pref, index) => ({
      ...pref,
      isSelected: index === firstValidIndex,
    }));
  }

  return result;
}
