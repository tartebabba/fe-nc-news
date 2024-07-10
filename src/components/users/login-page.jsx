import { UserAuthForm } from '@/components/UserAuthForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="my-auto">
        <UserAuthForm></UserAuthForm>
      </div>
    </main>
  );
}
