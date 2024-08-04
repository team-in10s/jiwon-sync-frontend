import SyncForm from './components/sync-form';
import PlatformConnection from './components/platform-connection';

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>https://jiwon-sync.in10s.co/app/sync</div>

      <div>
        <h2>기존 이력서 불러오기</h2>
        {/* TODO: 아래 syncform 은 노션 페이지 보고 문구 등 바꿔야함  */}
        <SyncForm />
      </div>
      <div>
        <h2>채용 플랫폼 연결 상태</h2>
        <PlatformConnection />
      </div>
    </div>
  );
}
