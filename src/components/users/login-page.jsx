import { UserAuthForm } from '@/components/UserAuthForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center border">
      <div className="mb-60">
        <UserAuthForm></UserAuthForm>
      </div>
    </main>
  );
}
