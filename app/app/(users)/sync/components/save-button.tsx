export default function SaveButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <button
      type="submit"
      className={`btn-gradient mt-8 w-full rounded-full py-2 font-bold text-secondary ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? '저장하는 중..' : '저장하기'}
    </button>
  );
}
