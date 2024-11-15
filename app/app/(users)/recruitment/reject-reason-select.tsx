import React, { useState } from 'react';

type RejectReasonSelectProps = {
  onConfirmReject: (reasons: string[]) => void;
};

const reasonLabels: { [key: string]: string } = {
  notConsidering: '현재 이직을 고려하지 않음',
  recentChange: '최근에 이직/승진했음',
  industryMismatch: '회사의 업종/산업이 관심사와 맞지 않음',
  companySizeMismatch: '회사의 규모가 기대와 다름',
  startupRisk: '스타트업 리스크가 우려됨',
  companyReputation: '회사의 평판/문화가 맞지 않아 보임',
  jobMismatch: '현재 전문 분야와 맞지 않음',
  responsibilityMismatch: '책임/권한이 기대와 다름',
  workloadConcern: '업무 강도가 너무 높아 보임',
  ongoingCommitment: '현재 진행 중인 프로젝트/학업이 있음',
  currentGrowth: '현재 회사에서의 성장 가능성이 더 큼',
  careerGoalMismatch: '제안된 포지션이 경력 목표와 맞지 않음',
  location: '출퇴근 거리가 멈',
  noRemoteOption: '재택근무 옵션 부재',
  workHoursMismatch: '근무 시간이 맞지 않음',
  lowSalary: '제시된 연봉이 기대에 미치지 못함',
  benefitsMismatch: '복리후생이 기대에 미치지 못함',
  stockOptionMismatch: '스톡옵션/인센티브 제도가 맞지 않음',
  familyReason: '가족 상황으로 인해 현재 이직 고려 어려움',
  relocationPlan: '해외 이주 계획 있음',
};

const RejectReasonSelect: React.FC<RejectReasonSelectProps> = ({ onConfirmReject }) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

  const handleReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const reasons = selectedOptions.map((option) => option.value);
    const uniqueReasons = Array.from(new Set([...selectedReasons, ...reasons]));
    setSelectedReasons(uniqueReasons);
    onConfirmReject(uniqueReasons); // Update the parent component with the selected reasons
  };

  const handleRemoveReason = (reason: string) => {
    const updatedReasons = selectedReasons.filter((r) => r !== reason);
    setSelectedReasons(updatedReasons);
    onConfirmReject(updatedReasons); // Update the parent component with the updated reasons
  };

  return (
    <div className="mt-4 transition-all duration-300">
      <h4 className="mb-2 font-bold">거절 사유 선택 (여러개)</h4>
      <select
        id="rejectReason"
        multiple
        className="mt-1 block w-full rounded-md border-gray-500 bg-gray-600 px-3 py-2 text-white"
        style={{ height: '200px' }}
        onChange={handleReasonChange}
      >
        <optgroup label="현재 상황">
          <option value="notConsidering">현재 이직을 고려하지 않음</option>
          <option value="recentChange">최근에 이직/승진했음</option>
        </optgroup>
        <optgroup label="회사 관련">
          <option value="industryMismatch">회사의 업종/산업이 관심사와 맞지 않음</option>
          <option value="companySizeMismatch">회사의 규모가 기대와 다름</option>
          <option value="startupRisk">스타트업 리스크가 우려됨</option>
          <option value="companyReputation">회사의 평판/문화가 맞지 않아 보임</option>
        </optgroup>
        <optgroup label="직무 관련">
          <option value="jobMismatch">현재 전문 분야와 맞지 않음</option>
          <option value="responsibilityMismatch">책임/권한이 기대와 다름</option>
          <option value="workloadConcern">업무 강도가 너무 높아 보임</option>
        </optgroup>
        <optgroup label="경력 개발">
          <option value="ongoingCommitment">현재 진행 중인 프로젝트/학업이 있음</option>
          <option value="currentGrowth">현재 회사에서의 성장 가능성이 더 큼</option>
          <option value="careerGoalMismatch">제안된 포지션이 경력 목표와 맞지 않음</option>
        </optgroup>
        <optgroup label="근무 조건">
          <option value="location">출퇴근 거리가 멈</option>
          <option value="noRemoteOption">재택근무 옵션 부재</option>
          <option value="workHoursMismatch">근무 시간이 맞지 않음</option>
        </optgroup>
        <optgroup label="보상 패키지">
          <option value="lowSalary">제시된 연봉이 기대에 미치지 못함</option>
          <option value="benefitsMismatch">복리후생이 기대에 미치지 못함</option>
          <option value="stockOptionMismatch">스톡옵션/인센티브 제도가 맞지 않음</option>
        </optgroup>
        <optgroup label="개인적 사유">
          <option value="familyReason">가족 상황으로 인해 현재 이직 고려 어려움</option>
          <option value="relocationPlan">해외 이주 계획 있음</option>
        </optgroup>
      </select>

      <div className="mt-4">
        <h5 className="mb-2 font-bold">선택한 거절 사유:</h5>
        <ul className="list-disc pl-5">
          {selectedReasons.map((reason) => (
            <li key={reason} className="flex justify-between">
              <span>{reasonLabels[reason]}</span>
              <button
                onClick={() => handleRemoveReason(reason)}
                className="text-red-500 hover:text-red-700"
              >
                취소
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RejectReasonSelect;
