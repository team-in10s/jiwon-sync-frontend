지원전에 Sync 프론트엔드 프로젝트 입니다.

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

## 프로젝트 구조

- TODO

## 규칙 (???)

- TODO
- husky 있구요...

## 브랜치 관리 (2024.08 기준)

- ❌ main 브랜치에 직접 커밋할 수 없습니다.
- main 브랜치로 PR을 올려서 머지하는 방식으로만 커밋할 수 있습니다.
- feature 작업 시: staging 브랜치에서 feature 브랜치를 생성합니다.

## AWS Amplify 배포 (2024.08 기준)

- AWS Amplify에 배포됨 (지역: 서울)
- 이 프로젝트 main 브랜치에 커밋이 머지되면 자동으로 빌드 후 배포되는 방식
- 임시로 배포 결과는 jean@in10s.co 메일로 보내지도록 해놓음
- 배포 버전 에러 확인하는 방법:
  - AWS amplify > jiwon-sync-frontend > 호스팅 > 모니터링 > 페이지 내 탭(tab) 중에 컴퓨팅 로그 호스팅 선택 > CloudWatch 로그 스트림
- 환경 변수 추가 (2단계):
  1. AWS amplify > jiwon-sync-frontend > 호스팅 > 환경변수에서 환경 변수 추가
  2. AWS amplify > jiwon-sync-frontend > 호스팅 > 빌드설정에서 amplify.yml 업데이트
     - 참고: [환경 변수가 서버 측 런타임에 액세스할 수 있도록 만들기](https://docs.aws.amazon.com/ko_kr/amplify/latest/userguide/ssr-environment-variables.html)

## 모니터링 서비스

- TODO

## 백엔드 Repository

- [https://github.com/team-in10s/jiwon-sync-dio](https://github.com/team-in10s/jiwon-sync-dio)
- README 파일을 보고 필요한 파일 설치 후 uvicorn main:app -reload 명령어를 실행합니다.
- api docs: http://localhost:8000/docs

## 시퀀스 다이어그램

- Robert 현기님이 작성해 주셨습니다. ✨
- 프론트엔드, 백엔드 간 커뮤니케이션이 도식화 되어 있습니다. (2024 8월 초 기준)
- https://github.com/team-in10s/jiwon-sync-dio/blob/robert/sequence_diagram.puml 을 https://plantuml-editor.kkeisuke.com/에서 실행합니다.

## 깃 커밋 메시지 규칙

```
<Type>: 작업 내용

필요한 경우 커밋 메세지 본문에 이 작업을 왜 하게 되었는지에 대한 내용을 기입합니다,
```

- 참고: [https://github.com/nhn/tui.chart/blob/main/docs/COMMIT_MESSAGE_CONVENTION.md](https://github.com/nhn/tui.chart/blob/main/docs/COMMIT_MESSAGE_CONVENTION.md)

## 프로젝트 TODO list

- [ ] 클린 아키텍처 도입 검토
  - 외부 변동에 유연하게 대응하기 위한 방법 중 하나, 검토 필요함
- [ ] 테스트
  - 유닛 테스트, e2e 테스트 등 프론트엔드에 적합한 테스트 방법, 전략이 어떤게 좋을지 리서치 필요함
