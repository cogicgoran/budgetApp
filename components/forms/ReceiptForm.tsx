import { useRef, useState } from "react";
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
import { FormProvider, useForm } from "react-hook-form";

interface Props {}

const initialReceiptFormValue = {
  marketplace: "",
  date: "",
  currency: "",
  articles: [],
};

function ReceiptForm({}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [articles, setArticles] = useState<FormDataArticle[]>([]);
  const router = useRouter();
  const { t } = useTranslation();
  const totalPrice = articles.reduce(
    (acc, article) => acc + article.price * article.amount,
    0
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addProductRef = useRef<HTMLButtonElement>(null);

  const formMethods = useForm({
    defaultValues: initialReceiptFormValue,
  });

  const textAddProduct = t("addProduct");
  const textFinish = t("finish");
  const textNewReceipt = t("newReceipt");

  function addArticleHandler(article: FormDataArticle) {
    setArticles((prevState) => {
      return [...prevState, article];
    });
    addProductRef.current?.focus();
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
        unitPrice: article.price,
        amount: article.amount,
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
      <FormProvider {...formMethods}>
        <form
          onSubmit={submitHandler}
        >
          <ReceiptInfo />
          <ReceiptProductList
            onRemoveArticle={removeArticle}
            articleList={articles}
            total={totalPrice}
            selectedCurrencyId={formMethods.getValues("currency")}
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
          <Button
            ref={addProductRef}
            type="button"
            actionType="create"
            onClick={() => setShowModal(true)}
          >
            + {textAddProduct}
          </Button>
          <div className="text-center">
            <Button type="submit" actionType="success" disabled={isSubmitting}>
              {textFinish}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default ReceiptForm;
