import type { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.scss";
import "../styles/fonts.scss";
import Header from "../components/header/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuthService } from "../config/firebase/service";
import AppLayout from "../components/UI/layout/AppLayout";
import Language from "../components/language/Language";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage: NextPage<AppProps> = ({ Component, pageProps }) => {
  const [user, loading, error] = useAuthState(firebaseAuthService);

  if (loading) {
    console.log("LOADING AUTH");
    return <div>LOADING</div>;
  }

  if (error) {
    console.log("ERROR");
    return <div>ERROR</div>;
  }

  if (user) {
    console.log("USER", user);
  }

  return (
    <>
      <Head>
        <title>Budget App</title>
        <meta name="description" content="Budget App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <AppLayout>
        <Language />
        <Header />
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
};

export default HomePage;
