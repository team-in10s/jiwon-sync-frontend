export default function FaqPage() {
  return (
    <div className="container mx-auto">
      <div className="w-full text-center">
        <h1 className="text-gradient mb-8 text-3xl font-bold">자주 묻는 질문</h1>
      </div>

      {/* body content */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <section className="mb-6 rounded border border-dashed border-primary/30 p-8">
            <h2 className="mb-3 text-xl font-semibold">
              지원전에가 여러분의 커리어 비서가 되어 귀찮은 작업을 모두 도와드려요.
            </h2>
            <ul className="mb-3 list-item space-y-2 pl-1">
              <li>
                ✅ 내가 모든 플랫폼에 일일이 직접 입력하지 않아도 돼요. 연결한 플랫폼에 모두
                이력서를 동기화 할 수 있어요.
              </li>
              <li>
                ✅ 연결한 플랫폼은 아이디-비밀번호 없이 로그인버튼 원클릭으로 모든 플랫폼에 자동
                로그인할 수 있어요.
              </li>
              <li>✅ 다양한 플랫폼에서 받은 스카우트 제안을 정리하여 제안드려요.</li>
            </ul>
            <p className="text-xl">
              → 그래서 지원전에를 통해 관리할 새로운 계정을 생성해주셔야 해요!
            </p>
          </section>

          <section className="card p-8">
            {/* body FAQ */}
            <div>
              {/* <h2 className="text-2xl font-semibold">자주 묻는 질문</h2> */}
              {/* FAQ 1 */}
              <div className="mb-16">
                <h3 className="mb-3 text-xl font-semibold">
                  Q1. 각 채용 플랫폼 별 새 계정 생성 시 어떤 정보가 필요한가요?
                </h3>
                <p className="mb-2">
                  입력하신 전화번호/ 이메일만 있다면 지원전에 서비스에서 1분만에 가능해요.{' '}
                </p>
                <p>
                  각 플랫폼마다 조금씩 다른 전화번호 이메일 과정을 지원전에 서비스에서 한번에 처리할
                  수 있어요. 이후에는 지원전에 커리어 매니저가 정보를 동기화 하며 귀찮은 입력사항은
                  자동으로 입력해 드릴게요.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="mb-16">
                <h3 id="q2" className="mb-3 text-xl font-semibold">
                  Q2. 기존 계정을 유지할 수는 없나요?
                </h3>
                <p className="mb-2">지금은 기존 계정 연결이 어려워요.</p>
                <p>
                  다양한 소셜 로그인 등으로 로그인해주셨기 때문에 각 플랫폼 연결에는 각 소셜로그인
                  계정에 대한 동의가 필요해요. 지원전에는 커리어 전용 계정을 생성하여 개인정보를
                  보호하기 위해서라도 새로운 계정생성을 권장드려요.{' '}
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="mb-16">
                <h3 className="mb-3 text-xl font-semibold">
                  Q3. 계정 생성후에 기존 계정은 어떻게 되나요?
                </h3>
                <p className="mb-2">걱정마세요. 사라지지 않아요.</p>
                <p>
                  하지만 새로운 계정에만 새로운 커리어 정보가 업데이트 될거에요. 기존계정은 필요에
                  따라 유지하시거나, 삭제하셔도 무방해요.
                </p>
              </div>

              {/* FAQ 4 */}
              <div>
                <h3 className="mb-3 text-xl font-semibold">
                  Q4. 연동할 수 있는 채용 플랫폼을 추가할 계획이 있나요?
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
