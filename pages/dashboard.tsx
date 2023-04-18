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
import { useAtom, useAtomValue } from "jotai";
import { viewReceiptAtom } from "../store/atoms";
import { useEffect, useState } from "react";
import Backdrop from "../components/UI/backdrop/Backdrop";
import Modal from "../components/UI/modal/Modal";
import ViewReceipt from "../components/modal/ViewReceipt";

const Home: NextPage = () => {
  const [user] = useAuthState(firebaseAuthService);
  const router = useRouter();
  const { receipts, categories, isLoading, removeReceipt } =
    useRecentReceipts();
  const [viewReceiptId, setViewReceiptId] = useAtom(viewReceiptAtom);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Budget app dashboard page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.dashboard}>
        <RecentReceipts
          receipts={receipts}
          isLoading={isLoading}
          onDelete={removeReceipt}
        />
        <DashboardMonthly />
        <DashboardCategories categories={categories} isLoading={isLoading} />
        {viewReceiptId !== undefined && (
          <Backdrop
            onCancel={() => {
              setViewReceiptId(undefined);
            }}
          />
        )}
        {viewReceiptId !== undefined && (
          <Modal>
            <ViewReceipt onDelete={removeReceipt} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default Home;
