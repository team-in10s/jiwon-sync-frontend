import SigninForm from './components/signin-form';

export default function Index() {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-gradient mb-8 text-center text-4xl font-bold md:text-6xl">
        지원전에 Sync
      </h1>

      <SigninForm />
    </div>
  );
}
