import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { firebaseAuthService } from "../config/firebase/service";
import { PATHS } from "../utils/constants";
import styles from "../components/pages/new-receipt/newReceipt.module.scss";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import ReceiptInfo from "../components/pages/new-receipt/ReceiptInfo";
import ReceiptProductList from "../components/pages/new-receipt/ReceiptProductList";
import ReceiptAddProduct from "../components/pages/new-receipt/ReceiptAddProduct";
import Backdrop from "../components/UI/backdrop/Backdrop";
import { createReceipt } from "../utils/function/api.ts/dashboard";
import ReceiptForm from "../components/forms/ReceiptForm";

export function isReceiptInfoValid(info: any) {
  const { marketplace, date, currency } = info;
  if (
    typeof marketplace === "string" &&
    typeof date === "string" &&
    typeof currency === "string" &&
    marketplace.length > 0 &&
    date.length > 0 &&
    currency.length > 0 &&
    isFinite(new Date(date) as any)
  ) {
    return true;
  }
  return false;
}

const NewReceiptPage: NextPage = () => {
  const [user] = useAuthState(firebaseAuthService);
  const router = useRouter();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textNewReceipt = t("newReceipt");

  if (!user) {
    router.push("/auth");
    return null;
  }

  async function submitHandler(e: any) {
    // TODO: Set validation
    // e.preventDefault();
    // if (!(isReceiptInfoValid(receiptInfo) && articles.length > 0)) {
    //   toast.error("Invalid receipt");
    //   return;
    // }
    // const data = {
    //   info: receiptInfo,
    //   articles: articles,
    // };
    // setIsSubmitting(true);
    // try {
    //   createReceipt(data);
    //   router.push(PATHS.DASHBOARD);
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Failed to create new receipt.");
    // } finally {
    //   setIsSubmitting(false);
    // }
  }

  return (
    <div className={styles["new-receipt"]}>
      <h3>{textNewReceipt}</h3>
      <ReceiptForm isSubmitting={isSubmitting} submitHandler={submitHandler} />
    </div>
  );
};

export default NewReceiptPage;
