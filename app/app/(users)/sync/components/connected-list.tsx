// 'use client';

import Image from 'next/image';
import { PlatformName } from '@/app/lib/constants';
import { PlatformConnectionStatus } from '../types';
import PlatformConnectButton from './platform-connect-button';

type PropType = {
  list: {
    platform: PlatformName;
    displayName?: string;
    status: PlatformConnectionStatus;
    imageSrc: string | null;
  }[];
};

export default function ConnectedList({ list }: PropType) {
  console.log('ConnectedList (server component) rendered');

  return (
    <div>
      {list.map((statusList) => {
        const { platform, imageSrc, displayName, status } = statusList;
        return (
          <div
            className="mb-4 flex items-center justify-between rounded-lg bg-gray-600 p-4"
            key={platform}
          >
            <div className="flex items-center gap-2">
              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt={displayName || ''}
                  width={24}
                  height={24}
                  className="rounded-md"
                />
              )}
              <span>{displayName} </span>
            </div>

            <PlatformConnectButton status={status} platform={platform} />
          </div>
        );
      })}
    </div>
  );
}

// function EmailAuthContent({
//   selectedPlatform,
//   onClickConnect,
// }: {
//   selectedPlatform: 'saramin' | 'jumpit';
//   onClickConnect: () => Promise<void>;
// }) {
//   return (
//     <div>
//       <h3 className="mb-4 text-lg font-bold">{selectedPlatform} 연결</h3>
//       <p className="mb-2 font-bold">약관 동의</p>
//       <ul>
//         {PLATFORM_TERMS[selectedPlatform]?.map((platformTerm) => {
//           return <li key={platformTerm.title}>{platformTerm.title}</li>;
//         })}
//       </ul>
//       {/* <input type="checkbox" name="" id="" /> */}
//       <div>
//         <input type="checkbox" id="agree" name="agree" defaultChecked />
//         <label htmlFor="agree">모두 동의합니다.</label>
//       </div>
//       <button className="bg-green-300 p-2" onClick={onClickConnect}>
//         연결하기
//       </button>
//     </div>
//   );
// }

// function PhoneAuthContent({ selectedPlatform }: { selectedPlatform: string | null }) {
//   return (
//     <div>
//       <h3 className="mb-4 text-lg font-bold">{selectedPlatform} 연결</h3>
//       <p>핸드폰 인증이 필요한 플랫폼</p>
//       {/* step1: 인증번호 요청 UI */}
//       {/* step2: 인증번호 입력 UI */}
//       {/* step3: 약관 동의 UI */}
//     </div>
//   );
// }
