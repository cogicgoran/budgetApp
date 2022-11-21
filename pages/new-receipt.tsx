import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { firebaseAuthService } from "../config/firebase/service";
import { useHttp } from "../hooks/useHttp";
import { PATHS } from "../utils/constants";
import styles from "../components/pages/new-receipt/newReceipt.module.scss";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import ReceiptInfo from "../components/pages/new-receipt/ReceiptInfo";
import ReceiptProductList from "../components/pages/new-receipt/ReceiptProductList";
import ReceiptAddProduct from "../components/pages/new-receipt/ReceiptAddProduct";
import Backdrop from "../components/UI/backdrop/Backdrop";

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

const DEFAULT_RECEIPT_INFO = {
  marketplace: "",
  date: "",
  currency: "",
};

const NewReceiptPage: NextPage = () => {
  const [user] = useAuthState(firebaseAuthService);
  const router = useRouter();
  const { t } = useTranslation();
  const [articles, setArticles] = useState<any[]>([]);
  const [receiptInfo, setReceiptInfo] = useState(DEFAULT_RECEIPT_INFO);
  const [showModal, setShowModal] = useState(false);
  const { error, fetchTask, isLoading } = useHttp();

  if (!user) {
    router.push("/auth");
    return null;
  }

  const textAddProduct = t("addProduct");
  const textFinish = t("finish");
  const textNewReceipt = t("newReceipt");

  const totalPrice = articles.reduce((acc, article) => acc + article.price, 0);

  function addArticleHandler(article: any) {
    setArticles((prevState) => {
      return [...prevState, article];
    });
  }

  function removeArticleAtIndex(index: any) {
    setArticles(articles.slice(0, index).concat(articles.slice(index + 1)));
  }

  async function submitHandler(e: any) {
    e.preventDefault();
    if (!(isReceiptInfoValid(receiptInfo) && articles.length > 0)) {
      toast.error("Invalid receipt");
      return;
    }

    const data = {
      info: receiptInfo,
      articles: articles,
    };

    fetchTask(
      {
        url: "http://localhost:8000/api/receipts",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      },
      handleSuccess,
      handleError
    );

    function handleSuccess() {
      setReceiptInfo(DEFAULT_RECEIPT_INFO);
      setArticles([]);
      router.push(PATHS.DASHBOARD);
    }

    function handleError(error: any) {
      const myError = error.response?.data;
      toast.error(
        `Error: ${myError ? myError.status : error.statusCode}`,
        myError ? myError.message : error.message
      );
    }
  }

  return (
    <div className={styles["new-receipt"]}>
      <h3>{textNewReceipt}</h3>
      <div>
        <form
          className={styles["new-receipt-content-wrapper"]}
          onSubmit={submitHandler}
        >
          <ReceiptInfo value={receiptInfo} onChangeValue={setReceiptInfo} />
          <ReceiptProductList
            onRemoveArticle={removeArticleAtIndex}
            articleList={articles}
            total={totalPrice}
            currency={receiptInfo.currency}
          />
          {showModal &&
            createPortal(
              <Backdrop onCancel={() => setShowModal(false)} />,
              document.getElementById("backdrop-root")!
            )}
          {showModal &&
            createPortal(
              <ReceiptAddProduct
                currency={receiptInfo.currency}
                onAddArticle={addArticleHandler}
                onCancel={() => setShowModal(false)}
              />,
              document.getElementById("overlay-root")!
            )}
          <button
            className={styles["new-receipt__add-product"]}
            type="button"
            onClick={() => setShowModal(true)}
          >
            + {textAddProduct}
          </button>
          <div className={styles["new-receipt-actions"]}>
            <button className={styles["new-receipt-finish-btn"]} type="submit">
              {textFinish}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewReceiptPage;
