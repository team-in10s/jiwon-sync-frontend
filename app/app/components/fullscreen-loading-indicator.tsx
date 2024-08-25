// app/app/components/fullscreen-loading-indicator.tsx

export default function FullScreenLoadingIndicator({ message }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="flex flex-col items-center rounded-lg bg-white p-6">
        <svg
          className="mb-4 size-10 animate-spin text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <div className="text-center font-semibold text-gray-700">
          <div>처리 중...</div>
          <div>{message || ''}</div>
        </div>
      </div>
    </div>
  );
}
