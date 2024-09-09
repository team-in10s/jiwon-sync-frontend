import { saveMainResume } from './api';
import { validateUrl } from './utils';
import { ERROR_MESSAGE, HrPlatformName } from './constants';
import { toast } from 'react-hot-toast';

export const uploadResumeByLink = async (resumeUrl: string, platforms: HrPlatformName[]) => {
  const validateUrlResult = validateUrl(resumeUrl);
  if (validateUrlResult) {
    toast.error(validateUrlResult);
    return false;
  }

  const formData = new FormData();
  formData.append('link', resumeUrl);

  return await uploadResume(formData, platforms);
};

export const uploadResumeByFile = async (resumeFile: File, platforms: HrPlatformName[]) => {
  const formData = new FormData();
  formData.append('file', resumeFile);

  return await uploadResume(formData, platforms);
};

export const uploadResumeByPlatform = async (
  selectedPlatform: string,
  allPlatforms: HrPlatformName[]
) => {
  const filteredPlatforms = allPlatforms.filter((p) => p !== selectedPlatform);

  if (filteredPlatforms.length === 0) {
    toast.error('연결된 플랫폼이 1곳 밖에 없습니다. 이력서를 연동할 다른 플랫폼이 없습니다');
    return false;
  }

  const formData = new FormData();
  formData.append('link', selectedPlatform);

  return await uploadResume(formData, filteredPlatforms);
};

const uploadResume = async (formData: FormData, platforms: HrPlatformName[]) => {
  const promises = platforms.map((platformId) => {
    const platformFormData = new FormData();
    for (const [key, value] of formData.entries()) {
      platformFormData.append(key, value);
    }
    platformFormData.append('platform', platformId);
    return saveMainResume(platformFormData);
  });

  try {
    const results = await Promise.all(promises);
    let allSuccessful = true;

    results.forEach((result, index) => {
      if (result.error) {
        console.error(`Failed to upload resume for ${platforms[index]}:`, result.error);
        allSuccessful = false;
      } else if (result.detail) {
        toast.error(`${result.detail[0].msg}`);
        allSuccessful = false;
      }
    });

    if (allSuccessful) {
      toast.success('이력서 업로드 성공! 24시간 내 동기화 완료 됩니다.');
      return true;
    }
  } catch (error) {
    toast.error(`${ERROR_MESSAGE.reason.network} ${ERROR_MESSAGE.action.retry}`);
  }

  return false;
};
