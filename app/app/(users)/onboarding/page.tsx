export default function Index() {
  return (
    <div className="container mx-auto">
      <div className="w-full text-center">
        <h1 className="text-gradient mb-8 text-3xl font-bold">onboarding</h1>
      </div>

      <div className="flex justify-center">
        <OnboardingDiv />
      </div>
    </div>
  );
}

function OnboardingDiv() {
  return (
    <div className="card w-full max-w-2xl p-7">
      <div>0</div>
    </div>
  );
}
