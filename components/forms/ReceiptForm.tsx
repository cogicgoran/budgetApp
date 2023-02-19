import { useState } from "react";
import ReceiptInfo from "../pages/new-receipt/ReceiptInfo";
import ReceiptProductList from "../pages/new-receipt/ReceiptProductList";
import styles from "../pages/new-receipt/newReceipt.module.scss";
import Backdrop from "../UI/backdrop/Backdrop";
import ReceiptAddProduct, {
  FormDataArticle,
} from "../pages/new-receipt/ReceiptAddProduct";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { isReceiptInfoValid } from "../../pages/new-receipt";
import { toast } from "react-toastify";
import axios from "axios";
import { createReceipt } from "../../utils/function/api/receipt";
import { useRouter } from "next/router";
import { PATHS } from "../../utils/constants";
import { Category } from "@prisma/client";
import { ReceiptDto } from "../../utils/dto/receipt.dto";
import Button from "../UI/button/Button";

interface Props {}

const DEFAULT_RECEIPT_INFO = {
  marketplace: "",
  date: "",
  currency: "",
};

function ReceiptForm({}: Props) {
  const [receiptInfo, setReceiptInfo] = useState(DEFAULT_RECEIPT_INFO);
  const [showModal, setShowModal] = useState(false);
  const [articles, setArticles] = useState<FormDataArticle[]>([]);
  const router = useRouter();
  const { t } = useTranslation();
  const totalPrice = articles.reduce((acc, article) => acc + article.price, 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textAddProduct = t("addProduct");
  const textFinish = t("finish");
  const textNewReceipt = t("newReceipt");

  function addArticleHandler(article: FormDataArticle) {
    setArticles((prevState) => {
      return [...prevState, article];
    });
  }

  function createReceiptPayload(data: {
    marketplace: string;
    date: Date;
    currency: string;
    articles: FormDataArticle[];
  }) {
    return ReceiptDto.parse({
      marketplaceId: Number(data.marketplace),
      date: data.date.toISOString(),
      currencyId: Number(data.currency),
      articles: data.articles.map((article) => ({
        name: article.name,
        category: { id: article.category.id },
        price: article.price,
      })),
    });
  }

  async function submitHandler(e: any) {
    e.preventDefault();
    if (!(isReceiptInfoValid(receiptInfo) && articles.length > 0)) {
      toast.error("Invalid receipt");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = createReceiptPayload({
        marketplace: receiptInfo.marketplace,
        date: new Date(receiptInfo.date),
        currency: receiptInfo.currency,
        articles: articles,
      });

      await createReceipt(payload);
      router.push(PATHS.DASHBOARD);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create new receipt.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function removeArticle(uuid: string) {
    setArticles(articles.filter((article) => article.uuid !== uuid));
  }

  return (
    <div>
      <form
        className={styles["new-receipt-content-wrapper"]}
        onSubmit={submitHandler}
      >
        <ReceiptInfo value={receiptInfo} onChangeValue={setReceiptInfo} />
        <ReceiptProductList
          onRemoveArticle={removeArticle}
          articleList={articles}
          total={totalPrice}
          selectedCurrencyId={receiptInfo.currency}
        />
        {showModal &&
          createPortal(
            <Backdrop onCancel={() => setShowModal(false)} />,
            document.getElementById("backdrop-root")!
          )}
        {showModal &&
          createPortal(
            <ReceiptAddProduct
              onAddArticle={addArticleHandler}
              onCancel={() => setShowModal(false)}
            />,
            document.getElementById("overlay-root")!
          )}
        <Button type="button" actionType="create" onClick={() => setShowModal(true)}>
          + {textAddProduct}
        </Button>
        <div className="text-center">
          <Button type="submit" actionType="success" disabled={isSubmitting}>
            {textFinish}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ReceiptForm;
