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

## 배포

- TODO, aws amplify 배포 예정

## 백엔드 Repository

- [https://github.com/team-in10s/jiwon-sync-dio](https://github.com/team-in10s/jiwon-sync-dio)
- README 파일을 보고 필요한 파일 설치 후 uvicorn main:app -reload 명령어를 실행합니다.

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
