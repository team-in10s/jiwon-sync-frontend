// import { redirect } from 'next/navigation';
import fs from 'fs';
import path from 'path';

export default function Home() {
  // redirect('https://jiwon-sync.in10s.co/');
  const filePath = path.join(process.cwd(), 'public', 'index.html');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return <div dangerouslySetInnerHTML={{ __html: fileContent }} />;
  return (
    <></>
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <div>여긴 개인회원용 랜딩페이지 자리</div>
    // </main>
  );
}
