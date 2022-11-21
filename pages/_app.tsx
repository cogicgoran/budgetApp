import type { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import styles from "../styles/app.module.scss";
import "../styles/globals.css";
import "../styles/fonts.css";
import Header from "../components/header/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuthService } from "../config/firebase/service";

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
      <div className={styles.appContainer}>
        <div className={styles.appLanguage}>
          <select
            name="language"
            id=""
            // defaultValue={prefLanguage} TODO: implement
            // onChange={languageChangeHandler} TODO: implement
          >
            <option value="en">ENG</option>
            <option value="fr">FRA</option>
          </select>
        </div>
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default HomePage;
