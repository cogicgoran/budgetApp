import React from "react";
import styles from "./receiptProductList.module.scss";
import { useTranslation } from "react-i18next";
import ReceiptProduct from "./ReceiptProduct";
import { Article } from "@prisma/client";
import { FormDataArticle } from "./ReceiptAddProduct";
import { useNewReceiptContext } from "../../../context/NewReceiptContext";

interface Props {
  onRemoveArticle: (id: string) => void;
  selectedCurrencyId: string;
  total: any;
  articleList: FormDataArticle[];
}

function ReceiptProductList({articleList,selectedCurrencyId,onRemoveArticle,total}: Props) {
  const {currencies} = useNewReceiptContext()
  const { t } = useTranslation();
  const textProductName = t("productName");
  const textCategory = t("category");
  const textPrice = t("price");

  const currencyCode = currencies.find(currency => currency.id.toString() === selectedCurrencyId)?.code;


  return (
    <div>
      <table className={styles["new-receipt-table"]}>
        <thead>
          <tr>
            <th>{textProductName}</th>
            <th>{textCategory}</th>
            <th>{textPrice}</th>
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
                currencyId={selectedCurrencyId}
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
