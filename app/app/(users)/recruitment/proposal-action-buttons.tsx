import React, { useEffect, useState } from 'react';
import { AcceptResponse, Email, RejectResponse } from './types';
import { acceptProposalAction, rejectProposalAction } from './actions';
import RejectReasonSelect from './reject-reason-select';

type ProposalActionButtonsProps = {
  email: Email;
};

const ProposalActionButtons: React.FC<ProposalActionButtonsProps> = ({ email }) => {
  const [actionType, setActionType] = useState<'accept' | 'reject'>('accept');
  const [useDefaultResponse, setUseDefaultResponse] = useState(true);
  const [responseText, setResponseText] = useState('');
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

  useEffect(() => {
    setActionType('accept');
    setUseDefaultResponse(true);
    setResponseText('');
    setSelectedReasons([]);
  }, [email]);

  const handleConfirm = async () => {
    const responseType = useDefaultResponse ? 'ai' : 'manual';
    const responseContent = useDefaultResponse ? '' : responseText;

    if (actionType === 'accept') {
      const acceptResponse: AcceptResponse = {
        id: email.id,
        subject: email.subject,
        sender: email.from,
        content: email.body,
        responseType,
        responseContent,
      };
      await acceptProposalAction(acceptResponse);
    } else {
      const rejectResponse: RejectResponse = {
        id: email.id,
        subject: email.subject,
        sender: email.from,
        content: email.body,
        responseType,
        rejectReasons: selectedReasons,
      };
      await rejectProposalAction(rejectResponse);
    }
  };

  const isConfirmButtonDisabled =
    (!useDefaultResponse && responseText.trim() === '') ||
    (actionType === 'reject' && selectedReasons.length === 0);

  return (
    <div className="border-t border-gray-700 p-4">
      <h3 className="mb-4 text-xl font-bold">답장 보내기</h3>

      <div className="mb-4 flex justify-center">
        <div className="flex overflow-hidden rounded-full border">
          <button
            onClick={() => setActionType('accept')}
            className={`px-6 py-2 transition-all duration-300 ${
              actionType === 'accept' ? 'bg-green-100 text-green-700' : 'bg-white text-gray-700'
            }`}
          >
            수락
          </button>
          <button
            onClick={() => setActionType('reject')}
            className={`px-6 py-2 transition-all duration-300 ${
              actionType === 'reject' ? 'bg-red-100 text-red-700' : 'bg-white text-gray-700'
            }`}
          >
            거절
          </button>
        </div>
      </div>

      <div className="mt-2 flex items-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={useDefaultResponse}
            onChange={() => setUseDefaultResponse(!useDefaultResponse)}
            className="mr-2"
          />
          기본 답변 사용
        </label>
      </div>

      {!useDefaultResponse && (
        <div className="mb-4">
          <textarea
            className="w-full rounded-md border border-gray-500 bg-gray-600 p-2 text-white"
            rows={2}
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="답변 내용을 입력하세요"
          />
        </div>
      )}

      {actionType === 'reject' && <RejectReasonSelect onConfirmReject={setSelectedReasons} />}

      <div className="mt-4 flex justify-center">
        <button
          onClick={handleConfirm}
          className={`btn-secondary rounded-full px-4 py-2 transition-all duration-300 ${
            isConfirmButtonDisabled
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isConfirmButtonDisabled}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default ProposalActionButtons;
