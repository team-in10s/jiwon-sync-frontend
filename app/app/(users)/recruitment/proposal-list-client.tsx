'use client';

import { useState } from 'react';
import { Email } from './types';
import EmailBody from './email-body';
import EmailInbox from './email-inbox';
import { Pagination } from './pagination';

interface ProposalListClientProps {
  emails: Email[];
  totalEmails: number;
}

// eslint-disable-next-line react/prop-types
const ProposalListClient: React.FC<ProposalListClientProps> = ({ emails, totalEmails }) => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-gray-600 shadow-md md:flex-row">
      <div
        className="w-full overflow-y-auto border-r border-gray-700 md:w-1/3"
        style={{ height: 'calc(100vh - 12rem)' }}
      >
        <EmailInbox
          emails={emails}
          selectedEmail={selectedEmail}
          handleEmailClick={handleEmailClick}
        />
        <Pagination totalEmails={totalEmails} />
      </div>

      <div className="flex w-full flex-col md:w-2/3">
        {selectedEmail ? (
          <EmailBody selectedEmail={selectedEmail} />
        ) : (
          <div className="p-4 text-center text-gray-400">
            <p>이메일을 선택하세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalListClient;
