import { useSession, signIn, signOut } from 'next-auth/react';

const LoginPage = () => {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return (
      <>
        <p>Welcome, {session.user?.email}</p>
        <button onClick={() => signOut()}> Sign out</button>
      </>
    );
  }
  return (
    <>
      <p>You are not signed in</p>
      <button onClick={() => signIn()}>Sign in with Google</button>
    </>
  );
};

export default LoginPage;
