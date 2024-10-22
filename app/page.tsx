// import { redirect } from 'next/navigation';
// import fs from 'fs';
// import path from 'path';
// import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import LandingNavbar from './components/landing-navbar';
import AppFooter from './app/components/app-footer';
import GooglePlayButton from './app/components/google-play-button';
import AppleStoreButton from './app/components/apple-store-button';

export default function Home() {
  // redirect('https://jiwon-sync.in10s.co/');
  // const filePath = path.join(process.cwd(), 'public', 'index.html');
  // const fileContent = fs.readFileSync(filePath, 'utf8');

  // return <div dangerouslySetInnerHTML={{ __html: fileContent }} />;
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <LandingNavbar />

      {/* Main content - Full viewport section with new layout */}
      <main className="flex h-screen items-center justify-center bg-gray-50 pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 top-0 size-96 rounded-full bg-[#2DBDDA]/20 blur-3xl lg:-right-44 lg:h-[40vw] lg:w-[60vw] lg:blur-[120px]" />
          <div className="absolute -left-44 top-48 h-72 w-80 rounded-full bg-[#DA2D2D]/20 blur-xl lg:h-[30vw] lg:w-[40vw] lg:blur-[50px]" />
          <div className="absolute bottom-0 left-1/2 size-16 -translate-x-1/2 rounded-full bg-[#5B2DDA]/30 blur-3xl lg:-bottom-40 lg:size-[20vw] lg:blur-[100px]" />
        </div>

        <div className="relative aspect-video w-full max-w-5xl overflow-hidden px-4">
          {/* Text content */}
          <div className="absolute left-8 top-14">
            <h1 className="mb-4 text-3xl font-semibold text-gray-02 sm:text-4xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-snug">
              커리어를 한 곳에서 관리
              <br />
              간편하고 빠르게
            </h1>

            <div className="flex space-x-6">
              <AppleStoreButton />
              <GooglePlayButton />
            </div>
          </div>

          {/* Image placeholder */}
          <div className="absolute -right-3 bottom-24 flex h-2/3 w-3/4 items-center justify-center">
            <Image
              src="/assets/new-landing/orbit.png"
              alt="지원전에"
              priority
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        {/* Chevron icon */}
        <div className="absolute bottom-8 animate-bounce">
          <ChevronDown className="size-12 text-[#1e1e1e]" />
          <span className="sr-only">Scroll down for more content</span>
        </div>
      </main>

      {/* Service explanation sections */}
      <section className="bg-gradient-to-b from-white via-white to-[#7a64f52a] px-4 py-72">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-semibold text-gray-02">
            중요한 커리어 관리 한 곳에서 관리하세요. <br />
            “지원전에 Sync”로 무한한 기회를 잡을 수 있어요.
          </h3>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white via-white to-[#7a64f52a] py-56">
        <div className="mx-auto max-w-5xl px-8 text-gray-02">
          <div className="mb-24 text-5xl font-semibold leading-tight">
            커리어 관리, <br />
            단 한번의 동기화로
            <br />
            빠르고 간편하게
          </div>

          <div className="mb-24 flex justify-between">
            <div className="flex flex-col justify-center gap-2.5">
              <p className="text-3xl font-medium">
                한 번의 연결로 이력서를 <br />
                플랫폼 상관없이 업데이트
              </p>
              <p className="text-2xl text-[#444444]">
                여러 플랫폼 동시 업데이트로 <br />
                서류 작성 시간 88% 감소
              </p>
            </div>
            {/* <div>오른쪽 이미지</div> */}
            <div className="flex items-center">
              <Image
                src="/assets/new-landing/image1.png"
                alt="이력서를 플랫폼 상관없이 업데이트"
                width={400}
                height={200}
                objectFit="contain"
              />
            </div>
          </div>

          <div className="flex justify-between">
            {/* <div>왼쪽 이미지</div> */}
            <div className="flex items-center">
              <Image
                src="/assets/new-landing/image2.png"
                alt="스카우트 기회 극대화"
                width={400}
                height={200}
                objectFit="contain"
              />
            </div>
            <div className="flex flex-col justify-center gap-2.5">
              <p className="text-3xl font-medium">
                스카우트 기회는 극대화
                <br />
                관리는 효율적으로
              </p>
              <p className="text-2xl text-[#444444]">
                통합형 업데이트 관리로 제안 300% 증가
                <br />
                맞춤형 알고리즘으로 효율적으로 관리
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white via-white to-[#7a64f52a] px-4 py-56">
        <div className="mx-auto max-w-5xl px-8 text-gray-02">
          <div className="mb-14 text-5xl font-semibold leading-tight">
            커리어가 탄탄한
            <br />
            경력직들이 더 만족
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div
              className="rounded-lg bg-white p-9"
              style={{ boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)' }}
            >
              <p className="mb-6 text-2xl font-medium">
                &quot;이력서 업데이트에 들이는 시간이 크게 줄었어요. 덕분에 실제 면접 준비에 더
                집중할 수 있었습니다.&quot;
              </p>
              <div className="flex justify-between">
                <div className="flex items-center gap-7">
                  <Image
                    src="/assets/new-landing/avatar1.png"
                    alt="이용 후기1"
                    width={67}
                    height={67}
                  />
                  <p className="text-xl">이OO님, 마케팅 전문가</p>
                </div>

                <Image
                  src="/assets/new-landing/company1.png"
                  alt="이용 후기1"
                  width={71}
                  height={56}
                />
              </div>
            </div>

            <div
              className="rounded-lg bg-white p-9"
              style={{ boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)' }}
            >
              <p className="mb-6 text-2xl font-medium">
                &quot;이력서 업데이트에 들이는 시간이 크게 줄었어요. 덕분에 실제 면접 준비에 더
                집중할 수 있었습니다.&quot;
              </p>
              <div className="flex justify-between">
                <div className="flex items-center gap-7">
                  <Image
                    src="/assets/new-landing/avatar1.png"
                    alt="이용 후기1"
                    width={67}
                    height={67}
                  />
                  <p className="text-xl">이OO님, 마케팅 전문가</p>
                </div>

                <Image
                  src="/assets/new-landing/company1.png"
                  alt="이용 후기1"
                  width={71}
                  height={56}
                />
              </div>
            </div>

            <div
              className="rounded-lg bg-white p-9"
              style={{ boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)' }}
            >
              <p className="mb-6 text-2xl font-medium">
                &quot;이력서 업데이트에 들이는 시간이 크게 줄었어요. 덕분에 실제 면접 준비에 더
                집중할 수 있었습니다.&quot;
              </p>
              <div className="flex justify-between">
                <div className="flex items-center gap-7">
                  <Image
                    src="/assets/new-landing/avatar1.png"
                    alt="이용 후기1"
                    width={67}
                    height={67}
                  />
                  <p className="text-xl">이OO님, 마케팅 전문가</p>
                </div>

                <Image
                  src="/assets/new-landing/company1.png"
                  alt="이용 후기1"
                  width={71}
                  height={56}
                />
              </div>
            </div>

            <div
              className="rounded-lg bg-white p-9"
              style={{ boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)' }}
            >
              <p className="mb-6 text-2xl font-medium">
                &quot;이력서 업데이트에 들이는 시간이 크게 줄었어요. 덕분에 실제 면접 준비에 더
                집중할 수 있었습니다.&quot;
              </p>
              <div className="flex justify-between">
                <div className="flex items-center gap-7">
                  <Image
                    src="/assets/new-landing/avatar1.png"
                    alt="이용 후기1"
                    width={67}
                    height={67}
                  />
                  <p className="text-xl">이OO님, 마케팅 전문가</p>
                </div>

                <Image
                  src="/assets/new-landing/company1.png"
                  alt="이용 후기1"
                  width={71}
                  height={56}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-72">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-2xl font-semibold text-gray-02">
            커리어 관리,
            <br />
            지금부터 편하게 하세요.
          </p>

          <div className="flex justify-center space-x-6">
            <AppleStoreButton />
            <GooglePlayButton />
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  );
}
