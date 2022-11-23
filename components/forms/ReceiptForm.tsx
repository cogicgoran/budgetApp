import { useState } from "react";
import ReceiptInfo from "../pages/new-receipt/ReceiptInfo";
import ReceiptProductList from "../pages/new-receipt/ReceiptProductList";
import styles from "../pages/new-receipt/newReceipt.module.scss";
import Backdrop from "../UI/backdrop/Backdrop";
import ReceiptAddProduct from "../pages/new-receipt/ReceiptAddProduct";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

interface Props {
  submitHandler: any;
  isSubmitting: boolean;
}

const DEFAULT_RECEIPT_INFO = {
  marketplace: "",
  date: "",
  currency: "",
};

function ReceiptForm({ submitHandler, isSubmitting }: Props) {
  const [receiptInfo, setReceiptInfo] = useState(DEFAULT_RECEIPT_INFO);
  const [showModal, setShowModal] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const { t } = useTranslation();
  const totalPrice = articles.reduce((acc, article) => acc + article.price, 0);

  const textAddProduct = t("addProduct");
  const textFinish = t("finish");
  const textNewReceipt = t("newReceipt");

  function addArticleHandler(article: any) {
    setArticles((prevState) => {
      return [...prevState, article];
    });
  }

  function removeArticleAtIndex(index: any) {
    setArticles(articles.slice(0, index).concat(articles.slice(index + 1)));
  }

  return (
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
          <button
            disabled={isSubmitting}
            className={styles["new-receipt-finish-btn"]}
            type="submit"
          >
            {textFinish}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReceiptForm;
