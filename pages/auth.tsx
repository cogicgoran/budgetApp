import {
  browserLocalPersistence,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import type { NextPage } from "next";
import Head from "next/head";
import { firebaseAuthService } from "../config/firebase/service";
import { Persistence } from "firebase/auth";

const AuthPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Authentication</title>
        <meta name="description" content="Budget app authentication page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Auth page</div>
      <div
        onClick={async () => {
          await firebaseAuthService.setPersistence(browserLocalPersistence);
          signInWithRedirect(firebaseAuthService, new GoogleAuthProvider());
        }}
      >
        SIGN IN WITH GOOGLE
      </div>
      <div
        onClick={async () => {
          await firebaseAuthService.setPersistence(browserLocalPersistence);
          signInWithRedirect(firebaseAuthService, new FacebookAuthProvider());
        }}
      >
        SIGN IN WITH FACEBOOK
      </div>
    </>
  );
};

export default AuthPage;
