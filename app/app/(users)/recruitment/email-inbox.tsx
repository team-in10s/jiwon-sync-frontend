import { Email } from './types';
import { getEmailStatusMessage, getEmailReadStatus } from './utils';
import { formatDate } from '@/app/lib/utils';
import { isTimeExceeded } from './utils';

interface EmailInboxProps {
  emails: Email[];
  selectedEmail: Email | null;
  handleEmailClick: (email: Email) => void;
}

const EmailInbox = ({ emails, selectedEmail, handleEmailClick }: EmailInboxProps) => {
  return (
    <>
      {emails.length > 0 ? (
        emails.map((email) => {
          const isExceeded = isTimeExceeded(email.date, new Date().toISOString());
          const isDisabled = (email.status && email.responseDate) || isExceeded;

          return (
            <div
              key={email.id}
              tabIndex={0}
              role="button"
              className={`cursor-pointer border-b border-purple-02 p-2 transition-colors duration-300 ${
                isDisabled ? 'bg-purple-01/50 text-gray-400' : 'bg-purple-01 font-bold text-gray-01'
              } ${selectedEmail?.id === email.id ? 'bg-purple-02' : ''}`}
              onClick={() => handleEmailClick(email)}
            >
              <div
                className={`flex items-center text-sm ${
                  email.status === 'accepted'
                    ? 'text-red-500'
                    : email.status === 'timeout_rejected' || email.status === 'rejected'
                      ? 'text-gray-500'
                      : ''
                }`}
              >
                {getEmailStatusMessage(email)}
              </div>

              {!email.status && <div className={`text-sm`}>{getEmailReadStatus(email.date)}</div>}
              <div className="mb-1 font-bold">{email.subject}</div>
              <div className="text-xs text-gray-500">제안 일자: {formatDate(email.date)}</div>
            </div>
          );
        })
      ) : (
        <div className="p-4 text-center text-gray-400">
          <p>수신한 스카우트 제안이 없습니다.</p>
        </div>
      )}
    </>
  );
};

export default EmailInbox;
