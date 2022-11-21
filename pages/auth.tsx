import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import { firebaseAuthService } from "../config/firebase/service";

const AuthPage: NextPage = () => {
  const [user] = useAuthState(firebaseAuthService);
  const [showSignIn, setShowSignIn] = useState(true);
  const router = useRouter();

  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <>
      {showSignIn && <SignIn onToggleForm={setShowSignIn} />}
      {!showSignIn && <SignUp onToggleForm={setShowSignIn} />}
    </>
  );
};

export default AuthPage;
