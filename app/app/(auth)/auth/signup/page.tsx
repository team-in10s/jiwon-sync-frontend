import SignupForm from './components/signup-form';

export default function Index() {
  return (
    <div className="container flex flex-col items-center justify-center">
      <h1 className="text-gradient mb-8 text-4xl font-bold md:text-5xl">지원전에 Sync</h1>

      <SignupForm />
    </div>
  );
}
