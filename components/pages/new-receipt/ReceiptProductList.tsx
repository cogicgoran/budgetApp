import React from "react";
import styles from "./receiptProductList.module.scss";
import { useTranslation } from "react-i18next";
import ReceiptProduct from "./ReceiptProduct";
import { Article } from "@prisma/client";
import { FormDataArticle } from "./ReceiptAddProduct";
import { useNewReceiptContext } from "../../../context/NewReceiptContext";
import { useFormContext } from "react-hook-form";

interface Props {
  onRemoveArticle: (id: string) => void;
  total: any;
  articleList: FormDataArticle[];
}

function ReceiptProductList({ articleList, onRemoveArticle, total }: Props) {
  const { currencies } = useNewReceiptContext();
  const { watch } = useFormContext();
  const selectedCurrencyId = watch("currency");
  const { t } = useTranslation();
  const textProductName = t("productName");
  const textCategory = t("category");
  const textPrice = t("price");
  const textAmount = t("amount");
  const textTotal = t("total");

  const currencyCode = currencies.find(
    (currency) => currency.id == selectedCurrencyId
  )?.code;

  return (
    <div>
      <table className={styles["new-receipt-table"]}>
        <thead>
          <tr>
            <th>{textProductName}</th>
            <th>{textCategory}</th>
            <th>{textPrice}</th>
            <th>{textAmount}</th>
            <th>{textTotal}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {articleList.map((article) => {
            return (
              <ReceiptProduct
                key={article.uuid}
                onRemoveArticle={onRemoveArticle}
                article={article}
                currency={currencyCode}
              />
            );
          })}
        </tbody>
      </table>
      <span className={styles["new-receipt-total"]}>
        {total.toFixed(2)} {currencyCode}
      </span>
    </div>
  );
}

export default ReceiptProductList;
