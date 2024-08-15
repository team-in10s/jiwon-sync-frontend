// app/app/(users)/account-status/account-status-skeleton.tsx

export default function AccountStatusSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="mb-4 flex animate-pulse items-center justify-between rounded-lg bg-gray-700 p-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="size-6 rounded-md bg-gray-600"></div>
            <div className="h-4 w-24 rounded bg-gray-600"></div>
          </div>
          <div className="h-4 w-16 rounded bg-gray-600"></div>
        </div>
      ))}
    </>
  );
}
