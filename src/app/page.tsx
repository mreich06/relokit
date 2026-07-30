import { auth, signIn, signOut } from '@/auth';

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    return (
      <>
        <p>Welcome, {session.user?.email}</p>
        {/* Server Action for Sign Out */}
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/login' });
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </>
    );
  }

  return (
    <>
      <p>You are not signed in</p>
      {/* Server Action for Google Sign In */}
      <form
        action={async () => {
          'use server';
          await signIn('google', { redirectTo: '/dashboard' });
        }}
      >
        <button type="submit">Sign in with Google</button>
      </form>
    </>
  );
}
