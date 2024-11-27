# 지원전에 Sync 프론트엔드 프로젝트

## 프로젝트 소개

지원전에 Sync는 다양한 채용 플랫폼을 한 곳에서 관리할 수 있는 프론트엔드 프로젝트입니다. 이 프로젝트는 사용자가 여러 채용 사이트에 이력서를 동기화하고, 스카우트 제안을 효과적으로 관리할 수 있도록 돕습니다.

## 로컬에서 실행하기

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

위 명령어를 실행 후 [http://localhost:3000](http://localhost:3000) 에 접속합니다.

## 규칙

- husky를 사용하여 코드 품질을 관리합니다.

## 브랜치 관리 (2024.08 기준)

- ❌ main 브랜치에 직접 커밋할 수 없습니다.
- main 브랜치로 PR을 올려서 머지하는 방식으로만 커밋합니다.
- feature 작업: staging 브랜치에서 feature 브랜치를 생성 후 staging에 머지합니다.

## AWS Amplify 배포 (2024.08 기준)

- AWS Amplify에 배포됨 (Region: Seoul)
- 이 프로젝트 main 브랜치에 커밋이 머지되면 자동으로 빌드 후 배포
- 임시로 배포 결과는 jean@in10s.co 메일로 보내지도록 해놓음
- 배포 버전 에러 확인하는 방법:
  - AWS amplify > jiwon-sync-frontend > 호스팅 > 모니터링 > 페이지 내 탭(tab) 중에 컴퓨팅 로그 호스팅 선택 > CloudWatch 로그 스트림
- 환경 변수 추가 (2단계):
  1. AWS amplify > jiwon-sync-frontend > 호스팅 > 환경변수에서 환경 변수 추가
  2. AWS amplify > jiwon-sync-frontend > 호스팅 > 빌드설정에서 amplify.yml 업데이트
     - 참고: [환경 변수가 서버 측 런타임에 액세스할 수 있도록 하기](https://docs.aws.amazon.com/ko_kr/amplify/latest/userguide/ssr-environment-variables.html)

## 모니터링 서비스

- [highlight](https://www.highlight.io/) 사용

## 백엔드 Repository

- [https://github.com/team-in10s/jiwon-sync-dio](https://github.com/team-in10s/jiwon-sync-dio)
- api docs: http://localhost:8000/docs

## 깃 커밋 메시지 규칙

```
<Type>: 작업 내용

필요한 경우 커밋 메세지 본문에 이 작업의 배경에 대한 내용을 기입합니다,
```

- 참고: [https://github.com/nhn/tui.chart/blob/main/docs/COMMIT_MESSAGE_CONVENTION.md](https://github.com/nhn/tui.chart/blob/main/docs/COMMIT_MESSAGE_CONVENTION.md)

## 사용된 기술 스택

- React
- Next.js
- TypeScript
- Tailwind CSS
- AWS Amplify
