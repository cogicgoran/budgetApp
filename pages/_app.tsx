import type { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.scss";
import "../styles/fonts.scss";
import "../styles/swiper.scss";
import "../styles/globals.css";
import Header from "../components/header/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuthService } from "../config/firebase/service";
import AppLayout from "../components/UI/layout/AppLayout";
import Language from "../components/language/Language";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import "react-datepicker/dist/react-datepicker.css";
import PageLoader from "../components/UI/loader/full-page-loader/PageLoader";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const HomePage: NextPage<AppProps> = ({ Component, pageProps }) => {
  const [user, loading, error] = useAuthState(firebaseAuthService);
  const [isAppInitialized, setIsAppInitialized] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!showApp) return;
    if (!user) router.push("/auth");
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setIsAppInitialized(true);
    }, 1250);
  }, []);

  async function handleLoaderHiding() {
    if (!user) {
      await router.push("/auth");
    }
    setShowApp(true);
  }

  if (error) {
    return <div>ERROR</div>;
  }

  return (
    <>
      <Head>
        <title>Budget App</title>
        <meta name="description" content="Budget App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-right" autoClose={3000} />
      {!showApp && (
        <PageLoader
          showLoader={!isAppInitialized || loading}
          onLoaderHidden={handleLoaderHiding}
        />
      )}
      <AppLayout>
        <Language />
        <Header />
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
};

export default HomePage;
