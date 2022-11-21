import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuthService } from "../config/firebase/service";

const Home: NextPage = () => {
  const [user] = useAuthState(firebaseAuthService);
  const router = useRouter();

  if (!user) {
    router.push("/auth");
  } else {
    router.push("/dashboard");
  }

  return null;
};

export default Home;
