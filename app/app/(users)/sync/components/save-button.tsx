type SaveButtonProps = {
  isSubmitting: boolean;
  disabled?: boolean;
};

export default function SaveButton({ isSubmitting, disabled = false }: SaveButtonProps) {
  return (
    <button
      type="submit"
      className={`mt-8 w-full rounded-full bg-gradient-to-r from-primary to-gradient-blue py-2 font-semibold text-secondary ${isSubmitting && 'cursor-not-allowed opacity-50'} ${disabled && 'cursor-not-allowed border-gray-400 bg-gray-400/50 bg-none text-white/60'}`}
      disabled={isSubmitting || disabled}
    >
      {isSubmitting ? '저장하는 중..' : '저장하기'}
    </button>
  );
}
