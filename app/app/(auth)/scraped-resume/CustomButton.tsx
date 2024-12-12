import clsx from "clsx";

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export default function CustomButton({
  text,
  onClick,
  className,
}: CustomButtonProps) {
  return (
    <button
      className={clsx(
        "bg-purple-04 p-[10px] rounded-[8px] flex flex-row justify-center items-center text-white",
        className,
      )}
    >
      {text}
    </button>
  );
}
