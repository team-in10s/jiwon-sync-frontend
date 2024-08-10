'use client';

import { PlatformName } from '@/app/lib/constants';
import { PlatformConnectionStatus } from '../types';
import Modal from '@/app/app/components/modal';
import { useState } from 'react';
import { connectP } from '../actions';

export default function PlatformConnectButton({
  status,
  platform,
}: {
  status: PlatformConnectionStatus;
  platform: PlatformName;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempStatus, setTempStatus] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConnect = async (platform: string) => {
    console.log(platform);
    openModal();
  };

  const handleEmailAuth = async () => {
    // optimistic UI update
    setTempStatus(true);

    closeModal();

    try {
      const result = await connectP(platform);
      console.log('Connection result:', result);
    } catch (error) {
      console.log('error // ', error);
    } finally {
      setTempStatus(false);
    }

    // await getPlatformStatus('needRevalidate');
    // await tryRevalidate();
  };

  return (
    <>
      {tempStatus ? (
        <span>연결중...(test)</span>
      ) : (
        <div>
          {status}{' '}
          <button
            className="btn-gradient rounded-full px-3 py-1 text-sm"
            onClick={() => {
              handleConnect(platform);
            }}
          >
            연결하기
          </button>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Example Modal">
        <p>{platform}</p>
        {/* <button onClick={closeModal}>Close Modal</button> */}

        {platform === 'saramin' || platform === 'jumpit' ? (
          <div>
            <p>이메일 인증</p>
            <button onClick={handleEmailAuth}>인증하기</button>
          </div>
        ) : (
          <div>
            <p>핸드폰 인증</p>
          </div>
        )}

        {/* {platform === 'saramin' || platform === 'jumpit' ? (
            <EmailAuthContent
              selectedPlatform={platform}
              onClickConnect={async () => {
                // // Optimistically update the platform status to 'connecting'
                // setPlatformStatus((prevStatus) =>
                //   prevStatus.map((p) =>
                //     p.platform === selectedPlatform ? { ...p, status: 'connecting' } : p
                //   )
                // );
                // closeModal();
                // ('use server');
                // const { credentials } = getUserAuth();
                // await fetch(`/api/platform/connect/${selectedPlatform}`, {
                //   method: 'POST',
                //   headers: {
                //     Authorization: `Basic ${credentials}`,
                //   },
                //   body: JSON.stringify({}),
                // });
                // revalidatePath('/app/sync');
              }}
            />
          ) : (
            <PhoneAuthContent selectedPlatform={selectedPlatform} />
          )} */}
      </Modal>
    </>
  );
}

// function ActualButton({ status, handleConnect, platform }) {
//   return (
//     <>
//       {status === 'completed' || status === 'connecting' ? (
//         <span className="text-sm">{status}</span>
//       ) : status === 'failed' ? (
//         <div>
//           {status}{' '}
//           <button
//             className="btn-gradient rounded-full px-3 py-1 text-sm"
//             onClick={() => {
//               handleConnect(platform);
//             }}
//           >
//             연결하기
//           </button>
//         </div>
//       ) : (
//         <button
//           className="btn-gradient rounded-full px-3 py-1 text-sm"
//           onClick={() => {
//             handleConnect(platform);
//           }}
//         >
//           연결하기
//         </button>
//       )}
//     </>
//   );
// }
