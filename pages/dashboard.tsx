import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import DashboardMonthly from "../components/pages/dashboard/DashboardMonthly";
import RecentReceipts from "../components/pages/dashboard/RecentReceipts";
import { firebaseAuthService } from "../config/firebase/service";
import styles from "../components/pages/dashboard/dashboard.module.scss";
import DashboardCategories from "../components/pages/dashboard/DashboardCategories";
import { useRecentReceipts } from "../hooks/useRecentReceipts";

const Home: NextPage = () => {
  const [user] = useAuthState(firebaseAuthService);
  const router = useRouter();
  const { receipts, categories, isLoading } = useRecentReceipts();


  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Budget app dashboard page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.dashboard}>
        <RecentReceipts receipts={receipts} isLoading={isLoading} />
        <DashboardMonthly />
        <DashboardCategories categories={categories} isLoading={isLoading} />
      </div>
    </>
  );
};

export default Home;
