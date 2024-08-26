// app/app/(users)/account-status/components/connect-button.tsx

type ConnectButtonProps = {
  onClick: () => void;
};

export default function ConnectButton({ onClick }: ConnectButtonProps) {
  return (
    <button onClick={onClick} className="btn-gradient rounded-3xl px-3 py-1 text-sm">
      연결하기
    </button>
  );
}
