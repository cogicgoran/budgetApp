import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuthService } from "../config/firebase/service";

const Home: NextPage = () => {
  const [user] = useAuthState(firebaseAuthService);
  const router = useRouter();

  if (!user) {
    router.push("/auth");
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Budget app dashboard page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default Home;
