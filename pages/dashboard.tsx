import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import DashboardMonthly from "../components/pages/dashboard/DashboardMonthly";
import RecentReceipts from "../components/pages/dashboard/RecentReceipts";
import { firebaseAuthService } from "../config/firebase/service";
import styles from "../components/pages/dashboard/dashboard.module.scss";
import DashboardCategories from "../components/pages/dashboard/DashboardCategories";

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
      <div className={styles.dashboard}>
        <RecentReceipts />
        <DashboardMonthly />
        <DashboardCategories/>
      </div>
    </>
  );
};

export default Home;
