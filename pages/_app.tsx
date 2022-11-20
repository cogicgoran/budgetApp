import type { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import styles from "../styles/app.module.css";
import "../styles/globals.css";
import "../styles/fonts.css";
import Header from "../components/header/Header";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { useAuthChange } from "../hooks/useAuthChange";

// const onAppInitUser = localStorage.getItem()

const HomePage: NextPage<AppProps> = ({ Component, pageProps }) => {
  useAuthChange();
  const { user } = store.getState().authSlice;
  console.log(user);
  
  return (
    <>
      <Head>
        <title>Budget App</title>
        <meta name="description" content="Budget App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <div className={styles["app-container"]}>
          <div className={styles["app-language"]}>
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
      </Provider>
    </>
  );
};

export default HomePage;
