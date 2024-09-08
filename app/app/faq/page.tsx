export default function FaqPage() {
  return (
    <div className="container mx-auto">
      <div className="w-full text-center">
        <h1 className="text-gradient mb-8 text-3xl font-bold">자주 묻는 질문</h1>
      </div>

      {/* body content */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <section className="mb-6 rounded border border-dashed border-primary/30 p-8 text-gray-200">
            <h2 className="mb-6 text-xl font-semibold md:text-2xl">
              채용 플랫폼 로그인에 어려움이 있으신가요?
            </h2>
            <ul className="mb-3 list-item space-y-6 pl-1">
              <li>
                🔴 아이디 비밀번호가 기억나지 않나요? 각 채용 플랫폼 별 아이디/ 비밀번호를 찾을 수
                있는 링크를 확인하세요.
                <a href="#q2" className="ml-1 underline underline-offset-2">
                  바로가기
                </a>
              </li>
              <li>
                🟡 소셜 로그인(네이버, 카카오, 구글 로그인 등)을 활용하여 가입한 경우, 아직은 해당
                로그인을 지원하지 않아요. 서비스가 개선되는 대로 안내드릴게요.
              </li>
              <li>
                🟢 자주 관리하지 않는 채용 플랫폼은 신규 계정 생성을 추천드려요. 지원전에로 계정
                생성한 플랫폼은 아이디-비밀번호 없이 로그인버튼 원클릭으로 모든 플랫폼에 자동
                로그인하고, 스카우트도 한번에 관리할 수 있어요. (기존 계정은 사라지지 않아요!)
              </li>
            </ul>
          </section>

          <section className="card p-8 text-gray-200">
            {/* body FAQ */}
            <div>
              {/* FAQ 1 */}
              <div>
                <h3 className="mb-3 text-xl font-semibold">Q1. 기존 계정을 연결 할 수는 없나요?</h3>
                <p className="mb-2">2024.09.06 기존 계정 연결이 가능하도록 업데이트 되었어요! 🎉</p>
                <p>
                  고객분들의 피드백을 적극 반영하여 개선했어요. 개인정보 보호부터 편리한 관리가 모두
                  가능하도록, 이후 소셜 로그인 기능도 빠르게 업데이트 할게요.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="pt-16" id="q2">
                <h3 className="mb-3 text-xl font-semibold">
                  Q2. 각 플랫폼의 아이디 비밀번호가 기억나지 않아요.
                </h3>
                <p className="mb-2">각 플랫폼의 아이디 비밀번호 찾기는 아래 링크를 참고해주세요.</p>
                <ul className="mb-4 list-inside list-disc space-y-1">
                  <li>
                    <a
                      className="underline underline-offset-2 hover:text-primary/70"
                      href="https://www.saramin.co.kr/zf_user/helpdesk/idpw-find"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      사람인 아이디, 비밀번호 찾기 ↗
                    </a>
                  </li>
                  <li>
                    <a
                      className="underline underline-offset-2 hover:text-primary/70"
                      href="https://id.wanted.jobs/email?amp_device_id=b88f78cd-88dc-4a01-8915-2de3e46d8a57&service=wanted&before_url=https%3A%2F%2Fwww.wanted.co.kr%2F&client_id=AhWBZolyUalsuJpHVRDrE4Px&redirect_url=https%3A%2F%2Fwww.wanted.co.kr%2Fapi%2Fchaos%2Fauths%2Fv1%2Fcallback%2Fset-token&message_key=userweb_home"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      원티드 아이디, 비밀번호 찾기 ↗
                    </a>
                  </li>
                  <li>
                    <a
                      className="underline underline-offset-2 hover:text-primary/70"
                      href="https://rememberapp.co.kr/login#/onboarding/accountFind/identificationStep"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      리멤버 아이디, 비밀번호 찾기 ↗
                    </a>
                  </li>
                  <li>
                    <a
                      className="underline underline-offset-2 hover:text-primary/70"
                      href="https://www.jumpit.co.kr/login"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      점핏 아이디, 비밀번호 찾기 ↗
                    </a>
                    <p className="text-gray-300">
                      (점핏은 이메일을 먼저 입력해야 비밀번호 찾기가 가능해요.)
                    </p>
                  </li>
                  <li>
                    <a
                      className="underline underline-offset-2 hover:text-primary/70"
                      href="https://edit.incruit.com/support/searchlogininfo.asp"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      인크루트 아이디, 비밀번호 찾기 ↗
                    </a>
                  </li>
                  <li>
                    <a
                      className="underline underline-offset-2 hover:text-primary/70"
                      href="https://www.jobkorea.co.kr/Login/Search/search_id.asp"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      잡코리아 아이디, 비밀번호 찾기 ↗
                    </a>
                  </li>
                </ul>

                <p>
                  💁 자주 관리하지 않는 플랫폼이라면 지원전에에서
                  <span className="font-semibold"> 신규계정 생성</span>을 추천드려요! 신규 계정을
                  연결하시면 스카우트 관리까지 아이디 비밀번호를 기억할 필요 없이 one-id로 더 쉽게
                  관리할 수 있어요.
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="pt-16">
                <h3 className="mb-3 text-xl font-semibold">
                  Q3. 각 채용 플랫폼 별 새 계정 생성 시 어떤 정보가 필요한가요?
                </h3>
                <p className="mb-2">
                  입력하신 전화번호/ 이메일만 있다면 지원전에 서비스에서 1분만에 가능해요.
                </p>
                <p>
                  각 플랫폼마다 조금씩 다른 전화번호, 이메일 로그인 과정을 지원전에 서비스에서
                  한번에 처리할 수 있어요. 이후에는 지원전에 커리어 매니저가 정보를 동기화 하며
                  귀찮은 입력사항은 자동으로 입력해 드릴게요.
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="pt-16">
                <h3 className="mb-3 text-xl font-semibold">
                  Q4. 계정 생성후에 기존 계정은 어떻게 되나요?
                </h3>
                <p className="mb-2">걱정마세요. 사라지지 않아요.</p>
                <p>
                  하지만 새로운 계정에만 새로운 커리어 정보가 업데이트 될거에요. 기존계정은 필요에
                  따라 유지하시거나, 삭제하셔도 무방해요.
                </p>
              </div>

              {/* FAQ 5 */}
              <div className="pt-16">
                <h3 className="mb-3 text-xl font-semibold">
                  Q5. 연동할 수 있는 채용 플랫폼을 추가할 계획이 있나요?
                </h3>
                <p>
                  네, 물론이에요. 필요한 채용플랫폼을 먼저 제안주시면 연동 예정 플랫폼으로 우선
                  검토할게요.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
