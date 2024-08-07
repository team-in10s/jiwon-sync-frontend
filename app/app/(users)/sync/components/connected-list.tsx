'use client';

// import { connectPlatform } from '../actions';
import Image from 'next/image';

type PropType = {
  list: {
    platform: string;
    displayName: string;
    status: string | null; // TODO:  status 값 타입 따로 잡기 string 말고,
    imageSrc: string | null;
  }[];
};

export default function ConnectedList({ list }: PropType) {
  const handleConnect = async (platform: string) => {
    console.log(platform);
    // TODO: 플랫폼에 따라 동의 or 핸드폰 인증 필요
    // 약관 동의부터 보이기: 사람인, 점핏,
    // 전화번호 인증: 인크루트, 잡코리아, 원티드, 리멤버

    //
    // await connectPlatform(platform);
    // 로딩 보이지 말고 일단 optimistic ui update.
    // 위 통신이 잘 끝나면
    // statusList.status 를 업데이트 해야 하는데 어떻게 할까
    // useTransition 훅 참고 -> useTransition is a React Hook that lets you update the state without blocking the UI.
  };

  return (
    <div>
      {list.map((statusList) => {
        return (
          <div
            className="mb-4 flex items-center justify-between rounded-lg bg-gray-600 p-4"
            key={statusList.platform}
          >
            <div className="flex items-center gap-2">
              {statusList.imageSrc && (
                <Image
                  src={statusList.imageSrc}
                  alt={statusList.displayName}
                  width={24}
                  height={24}
                  className="rounded-md"
                />
              )}
              <span>{statusList.displayName} </span>
            </div>

            {statusList.status === null ? (
              <button
                className="btn-gradient rounded-full px-3 py-1 text-sm"
                onClick={() => {
                  handleConnect(statusList.platform);
                }}
              >
                연결하기
              </button>
            ) : (
              <span className="text-sm">연결 완료</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
