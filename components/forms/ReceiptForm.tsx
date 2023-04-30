import { useRef, useState } from "react";
import ReceiptInfo from "../pages/new-receipt/ReceiptInfo";
import ReceiptProductList from "../pages/new-receipt/ReceiptProductList";
import Backdrop from "../UI/backdrop/Backdrop";
import ReceiptAddProduct, {
  FormDataArticle,
} from "../pages/new-receipt/ReceiptAddProduct";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { createReceipt } from "../../utils/function/api/receipt";
import { useRouter } from "next/router";
import { PATHS } from "../../utils/constants";
import { ReceiptDto } from "../../utils/dto/receipt.dto";
import Button from "../UI/button/Button";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { ReceiptFormData } from "../../pages/new-receipt";
import { Dayjs } from "dayjs";

interface Props {
  isSubmitting: boolean;
  submitHandler: (_formData: ReceiptFormData) => void;
}

function ReceiptForm({ isSubmitting, submitHandler }: Props) {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const addProductRef = useRef<HTMLButtonElement>(null);
  const formMethods = useFormContext<ReceiptFormData>();

  const articles = formMethods.watch("articles");
  const totalPrice = articles.reduce(
    (acc, article) => acc + article.price * article.amount,
    0
  );

  const textAddProduct = t("addProduct");
  const textFinish = t("finish");
  const textNewReceipt = t("newReceipt");

  function addArticleHandler(article: FormDataArticle) {
    formMethods.setValue("articles", [
      ...formMethods.getValues().articles,
      article,
    ]);
    addProductRef.current?.focus();
  }

  function removeArticle(uuid: string) {
    const currentArticles = formMethods.getValues().articles;
    formMethods.setValue(
      "articles",
      currentArticles.filter((article) => article.uuid !== uuid)
    );
  }

  return (
    <div>
      <form onSubmit={formMethods.handleSubmit(submitHandler)}>
        <ReceiptInfo />
        <ReceiptProductList
          onRemoveArticle={removeArticle}
          articleList={formMethods.getValues().articles}
          total={totalPrice}
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
    </div>
  );
}

export default ReceiptForm;

export function createReceiptPayload(formData: {
  marketplace: number;
  date: Dayjs;
  currency: number;
  articles: FormDataArticle[];
}) {
  return ReceiptDto.parse({
    marketplaceId: Number(formData.marketplace),
    date: formData.date.toISOString(),
    currencyId: Number(formData.currency),
    articles: formData.articles.map((article) => ({
      id: article.id,
      name: article.name,
      category: article.category,
      unitPrice: article.price,
      amount: article.amount,
    })),
  });
}
