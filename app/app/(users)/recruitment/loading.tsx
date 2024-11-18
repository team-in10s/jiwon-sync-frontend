export default function Loading() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-lg shadow-md md:flex-row">
      <div
        className="w-full overflow-y-auto border-r border-gray-400 p-4 md:w-1/3"
        style={{ height: 'calc(100vh - 12rem)' }}
      >
        {[...Array(5)].map((_, index) => (
          <div key={index} className="mb-4 h-20 rounded-md bg-gray-400"></div>
        ))}
      </div>

      <div className="flex w-full flex-col md:w-2/3">
        <div className="grow overflow-y-auto p-4">
          <div className="mb-4 h-10 rounded-md bg-gray-400"></div>
          <div className="mb-2 h-96 rounded-md bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
}
