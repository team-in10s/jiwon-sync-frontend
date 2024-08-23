type Props = {
  onClickConnect: () => Promise<void>;
};

export default function PlatformConnectButton({ onClickConnect }: Props) {
  return (
    <button
      className="btn-elevate mt-2 rounded-full border border-primary px-4 py-2 text-sm"
      onClick={onClickConnect}
    >
      약관 동의 후 계정 생성하기
    </button>
  );
}
