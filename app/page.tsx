// import { redirect } from 'next/navigation';
// import fs from 'fs';
// import path from 'path';
// import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import LandingNavbar from './components/landing-navbar';
import AppFooter from './app/components/app-footer';
// import LandingDownloadAppButton from './components/landing-download-app-button';
import UserBtnTemp from './components/user_button_temp';
import Link from 'next/link';


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
        {/* blurred effect background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -right-52 -top-20 size-[30rem] rounded-full bg-[#2DBDDA]/25 blur-[60px] sm:-right-24 sm:-top-32 md:size-[34rem] lg:-right-44 lg:-top-52 lg:size-[48rem]" />
          <div className="absolute -left-36 top-96 size-60 rounded-full bg-[#DA2D2D]/20 blur-[50px] sm:size-96 md:top-60 lg:-left-72 lg:top-44 lg:size-[36rem]" />
          <div className="absolute -bottom-10 left-1/2 size-72 -translate-x-1/3 rounded-full bg-[#5B2DDA]/20 blur-[50px] sm:-bottom-60 sm:size-[25rem] lg:size-[28rem]" />
        </div>

        <div className="relative z-10 aspect-video h-1/2 w-full max-w-5xl overflow-hidden px-4 sm:h-auto">
          {/* Text content */}
          <div className="z-10 sm:absolute sm:left-8 sm:top-14">
            <h1 className="mb-4 text-center text-2xl font-semibold text-gray-02 sm:text-left sm:text-4xl md:text-[3rem] md:leading-tight lg:text-[4rem] lg:leading-snug">
              커리어를 한 곳에서 관리
              <br />
              간편하고 빠르게
            </h1>

            {/* button */}
            {/* <LandingDownloadAppButton /> */}
            <UserBtnTemp />
          </div>

          {/* Image placeholder */}
          <div className="absolute left-1/2 right-0 w-full max-w-md -translate-x-1/2 sm:-right-3 sm:bottom-0 sm:left-auto sm:h-2/3 sm:w-[70%] sm:max-w-full sm:transform-none md:bottom-5 lg:bottom-16 lg:w-3/4">
            <Image
              src="/assets/new-landing/orbit.png"
              alt="지원전에"
              priority
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 75vw, 100vw"
              className="size-full object-contain"
              width={959}
              height={454}
              // layout="fill"
              // objectFit="contain"
            />
          </div>
        </div>

        {/* Chevron icon */}
        <div className="absolute bottom-8 z-10 animate-bounce">
          <ChevronDown className="size-12 text-[#1e1e1e]" />
          <span className="sr-only">Scroll down for more content</span>
        </div>
      </main>

      {/* Service explanation sections */}
      <section className="bg-gradient-to-b from-white via-white via-70% to-[#7a64f5]/20 px-4 py-72">
        <div className="mx-auto max-w-3xl text-center">
          <div className="hidden text-xl font-semibold text-gray-02 sm:block md:text-[1.75rem] lg:text-4xl">
            <p className="md:mb-2">중요한 커리어 관리 한 곳에서 관리하세요. </p>
            <p>“지원전에 Sync”로 무한한 기회를 잡을 수 있어요.</p>
          </div>

          <h3 className="block text-xl font-semibold leading-normal text-gray-02 sm:hidden lg:text-4xl">
            중요한 커리어 관리
            <br /> 한 곳에서 관리하세요. <br />
            “지원전에 Sync”로 <br />
            무한한 기회를 잡을 수 있어요.
          </h3>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white via-white via-70% to-[#7a64f5]/20 py-20 sm:py-56">
        <div className="mx-auto max-w-5xl px-10 text-gray-02 sm:px-8">
          <div className="mb-24 hidden text-xl font-semibold leading-tight sm:block sm:text-[2.25rem] md:text-[3rem] lg:text-[4rem]">
            커리어 관리, <br />
            단 한번의 동기화로
            <br />
            빠르고 간편하게
          </div>
          <div className="mb-6 block text-center text-xl font-semibold leading-tight sm:hidden lg:text-[4rem]">
            커리어 관리, <br />단 한번의 동기화로 빠르고 간편하게
          </div>

          <div className="mb-[4.5rem] flex flex-col-reverse items-center gap-6 sm:mb-24 sm:flex-row sm:justify-between">
            <div className="flex flex-col justify-center gap-3">
              <p className="text-xl font-medium leading-tight md:text-[2rem] lg:text-[2.5rem]">
                한 번의 연결로 이력서를 <br />
                플랫폼 상관없이 업데이트
              </p>
              <p className="text-sm text-[#444444] md:text-xl lg:text-2xl">
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

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            {/* <div>왼쪽 이미지</div> */}
            <div className="flex items-center">
              <Image
                src="/assets/new-landing/image2.png"
                alt="스카우트 기회 극대화"
                width={400}
                height={200}
                // className="h-auto w-3/4 object-contain sm:w-full"
                objectFit="contain"
              />
            </div>
            <div className="flex flex-col justify-center gap-3">
              <p className="text-xl font-medium leading-tight md:text-[2rem] lg:text-[2.5rem]">
                스카우트 기회는 극대화
                <br />
                관리는 효율적으로
              </p>
              <p className="text-sm text-[#444444] md:text-xl lg:text-2xl">
                통합형 업데이트 관리로 제안 300% 증가
                <br />
                맞춤형 알고리즘으로 효율적으로 관리
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white via-white via-70% to-[#7a64f5]/20 px-12 py-20 sm:px-4 sm:py-56">
        <div className="mx-auto max-w-5xl px-8 text-gray-02">
          <div className="mb-6 text-center text-xl font-semibold leading-tight sm:mb-14 sm:text-left sm:text-[2.25rem] md:text-[3rem] lg:text-[4rem]">
            커리어가 탄탄한
            <br />
            경력직들이 더 만족
          </div>

          <div className="flex flex-col gap-5 sm:flex-row">
            <div
              className="flex flex-col justify-between gap-4 rounded-lg bg-white p-6 md:p-9"
              style={{ boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)' }}
            >
              <p className="text-sm font-medium leading-tight lg:text-[1.65rem]">
                &quot;지원전에를 사용한 후, 스카우트 제안이 3배나 늘었어요. 더 좋은 기회를 선택할 수
                있게 되었죠.&quot;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-5">
                  <Image
                    src="/assets/new-landing/avatar0.png"
                    alt="유저"
                    width={67}
                    height={67}
                    className="size-9 md:size-16"
                  />
                  <p className="text-xs lg:text-xl">이OO님, 마케팅 전문가</p>
                </div>

                <Image
                  src="/assets/new-landing/company0.png"
                  alt="이용 후기"
                  width={40}
                  height={40}
                  className="w-8 md:w-16"
                />
              </div>
            </div>

            <div
              className="flex flex-col justify-between gap-4 rounded-lg bg-white p-6 md:p-9"
              style={{ boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)' }}
            >
              <p className="text-sm font-medium leading-tight lg:text-[1.65rem]">
                &quot;이력서 업데이트에 들이는 시간이 크게 줄었어요. 덕분에 실제 면접 준비에 더
                집중할 수 있었습니다.&quot;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-5">
                  <Image
                    src="/assets/new-landing/avatar1.png"
                    alt="유저"
                    width={67}
                    height={67}
                    className="size-9 md:size-16"
                  />
                  <p className="text-xs lg:text-xl">이OO님, 마케팅 전문가</p>
                </div>

                <Image
                  src="/assets/new-landing/company1.png"
                  alt="이용 후기"
                  width={71}
                  height={56}
                  className="h-6 w-8 md:h-12 md:w-16"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:py-72">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-xl font-semibold leading-snug text-gray-02 md:text-[1.75rem] lg:text-4xl">
            커리어 관리,
            <br />
            지금부터 편하게 하세요.
          </p>

          {/* button */}
          {/* <LandingDownloadAppButton center /> */}
          {/* <UserBtnTemp center /> */}
          {/* <UserBtnTemp /> */}
          {/* 아래 버튼 부분은 11.19 임시로 추가, 나중에 필요에 따라 UserBtnTemp 컴포넌트로 변경 */}
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/app/auth/signin"
              className="rounded-md bg-purple-00 px-4 py-[0.63rem] text-sm font-semibold text-white"
            >
              이력서 관리 시작하기
            </Link>
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  );
}
