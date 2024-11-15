import { Email } from './types';
import { getEmailStatusMessage, getEmailReadStatus } from './utils';
import { formatDate } from '@/app/lib/utils';

interface EmailInboxProps {
  emails: Email[];
  selectedEmail: Email | null;
  handleEmailClick: (email: Email) => void;
}

const EmailInbox = ({ emails, selectedEmail, handleEmailClick }: EmailInboxProps) => {
  return (
    <div
      className="w-full overflow-y-auto border-r border-gray-700 md:w-1/3"
      style={{ height: 'calc(100vh - 12rem)' }}
    >
      {emails.length > 0 ? (
        emails.map((email) => (
          <div
            key={email.id}
            tabIndex={0}
            role="button"
            className={`cursor-pointer border-b border-gray-700 p-2 transition-colors duration-300 ${
              email.read ? 'bg-gray-800 text-gray-400' : 'bg-gray-700 font-bold text-white'
            } ${selectedEmail?.id === email.id ? 'bg-green-200' : ''}`}
            onClick={() => handleEmailClick(email)}
          >
            <div className="text-sm">{getEmailStatusMessage(email)}</div>
            <div className="text-sm">{getEmailReadStatus(email)}</div>
            <div className="mb-1 font-bold">{email.subject}</div>
            <div className="text-xs text-gray-500">제안 일자: {formatDate(email.date)}</div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-400">
          <p>수신한 스카우트 제안이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default EmailInbox;
