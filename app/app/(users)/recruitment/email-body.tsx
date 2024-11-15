import { formatDate } from '@/app/lib/utils';
import { Email } from './types';
import ProposalActionButtons from './proposal-action-buttons';

const EmailBody = ({ selectedEmail }: { selectedEmail: Email }) => {
  return (
    <div className="grow p-4">
      <h3 className="mb-2 text-xl font-bold">{selectedEmail.subject}</h3>
      <p className="mb-4 text-sm text-gray-400">제안 일자: {formatDate(selectedEmail.date)}</p>
      <div
        className="mb-4 overflow-y-auto border-y border-gray-200 py-4"
        style={{ height: 'calc(100vh - 32rem)' }}
        dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
      />
      <ProposalActionButtons email={selectedEmail} />
    </div>
  );
};

export default EmailBody;
