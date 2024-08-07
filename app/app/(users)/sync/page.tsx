import SyncForm from './components/sync-form';
import PlatformConnection from './components/platform-connection';

export default function Index() {
  return (
    <div className="container mx-auto">
      <div className="w-full text-center">
        <h1 className="text-gradient mb-8 text-3xl font-bold">채용 플랫폼 연결하기</h1>
      </div>

      <div className="flex gap-4">
        <div className="card flex-1 p-7">
          <SyncForm />
        </div>

        <div className="card flex-1 bg-slate-300 p-10">
          <h2 className="mb-4 text-xl font-bold text-white">채용 플랫폼 연결 상태</h2>
          <PlatformConnection />
        </div>
      </div>
    </div>
  );
}
