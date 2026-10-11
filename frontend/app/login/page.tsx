import LoginForm from '@/components/LoginForm';

export default function Login() {
  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight">Login</h1>
          <p className="text-sm text-slate-600">
            Please enter your credentials to login.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
