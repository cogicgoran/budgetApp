import React from "react";
import styles from "./auth.module.scss";
import IconFacebook from "../icons/IconFacebook";
import IconGoogle from "../icons/IconGoogle";
import { useTranslation } from "react-i18next";
import {
  useSignInWithEmailAndPassword,
  useSignInWithFacebook,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { firebaseAuthService } from "../../config/firebase/service";
import { Field, Form, Formik } from "formik";
import { validationSignInSchema } from "../../utils/validation/auth.schema";
import classnames from "classnames";

interface Props {
  onToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<Props> = ({ onToggleForm }: Props) => {
  const { t } = useTranslation();
  const [signInWithFacebook] = useSignInWithFacebook(firebaseAuthService);
  const [signInWithGoogle] = useSignInWithGoogle(firebaseAuthService);
  const [signInWithEmailAndPassword, user, isLoading, error] =
    useSignInWithEmailAndPassword(firebaseAuthService);

  const textEmail = t("email");
  const textPassword = t("password");
  const textOr = t("or");
  const textSignIn = t("signIn");
  const textSignInWith = t("signInWith");
  const textDontHaveAnAccount = t("dontHaveAnAccount");
  const textSignUpHere = t("signUpHere");

  async function handleSignIn(values: any) {
    try {
      await signInWithEmailAndPassword(values.email, values.password);
    } catch (error) {
      alert("error signing up");
    }
  }

  async function handleSignInWithGoogle() {
    try {
      signInWithGoogle();
    } catch (error) {
      console.log(error);
      alert("error logging with google account");
    }
  }

  async function handleSignInWithFacebook() {
    try {
      await signInWithFacebook();
    } catch (error) {
      alert("error logging with facebook account");
    }
  }

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSignInSchema}
        onSubmit={handleSignIn}
      >
        {({ touched, errors }) => (
          <Form className={styles.signInForm}>
            <div
              className={classnames(styles.formInputWrapper, {
                [styles.invalid]: touched.email && errors.email,
              })}
            >
              <Field
                id="sign-in-email"
                name="email"
                placeholder={`${textEmail}...`}
              />
            </div>
            <div
              className={classnames(styles.formInputWrapper, {
                [styles.invalid]: touched.password && errors.password,
              })}
            >
              <Field
                type="password"
                id="sign-in-password"
                name="password"
                placeholder={`${textPassword}...`}
              />
            </div>
            <div className={styles.formControls}>
              <button disabled={isLoading} type="submit">
                {textSignIn}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div>{textOr}</div>
      <div className={styles.loginServiceWrapper}>
        <button
          className={styles.loginServiceBtn}
          onClick={handleSignInWithGoogle}
        >
          <IconGoogle />
          <span>{textSignInWith} Google</span>
        </button>
        <button
          className={styles.loginServiceBtn}
          onClick={handleSignInWithFacebook}
        >
          <IconFacebook />
          <span>{textSignInWith} Facebook</span>
        </button>
      </div>
      <div>
        {textDontHaveAnAccount} <br />{" "}
        <button
          onClick={() => {
            onToggleForm((prevState: boolean) => !prevState);
          }}
        >
          {textSignUpHere}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
