import { getAuth } from "firebase/auth";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuthService } from "../config/firebase/service";

const Home: NextPage = () => {
  const [user] = useAuthState(firebaseAuthService);
  const router = useRouter();

  if (!user) {
    router.push('/auth');
  } else {
    router.push('/dashboard');
  }


  return null;

  // return (
  //   <>
  //     <Head>
  //       <title>Budget App</title>
  //       <meta name="description" content="Budget app" />
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>
  //   </>
  // );
};

export default Home;
