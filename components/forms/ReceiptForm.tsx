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
import { FormProvider, useForm } from "react-hook-form";

interface Props {}

const initialReceiptFormValue = {
  marketplace: "",
  date: "",
  currency: "",
  articles: [] as FormDataArticle[],
};

function ReceiptForm({}: Props) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const addProductRef = useRef<HTMLButtonElement>(null);

  const formMethods = useForm({
    defaultValues: initialReceiptFormValue,
  });

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

  async function submitHandler(formData: typeof initialReceiptFormValue) {
    setIsSubmitting(true);
    try {
      const payload = createReceiptPayload({
        marketplace: formData.marketplace,
        date: new Date(formData.date),
        currency: formData.currency,
        articles: formData.articles,
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
    const currentArticles = formMethods.getValues().articles;
    formMethods.setValue(
      "articles",
      currentArticles.filter((article) => article.uuid !== uuid)
    );
  }

  return (
    <div>
      <FormProvider {...formMethods}>
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
      </FormProvider>
    </div>
  );
}

export default ReceiptForm;
