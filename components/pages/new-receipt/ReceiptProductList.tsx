import React from "react";
import styles from "./receiptProductList.module.scss";
import { useTranslation } from "react-i18next";
import ReceiptProduct from "./ReceiptProduct";

interface Props {
  onRemoveArticle: Function;
  currency: string;
  total: any;
  articleList: any[];
}

function ReceiptProductList(props: Props) {
  const { t } = useTranslation();
  const textProductName = t("productName");
  const textCategory = t("category");
  const textPrice = t("price");

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
          {/* TODO: Add custom id instead of index */}
          {props.articleList.map((article: any, index: any) => {
            return (
              <ReceiptProduct
                key={index}
                onRemoveArticle={props.onRemoveArticle}
                {...article}
                id={index}
                currency={props.currency}
              />
            );
          })}
        </tbody>
      </table>
      <span className={styles["new-receipt-total"]}>
        {props.total.toFixed(2)} {props.currency}
      </span>
    </div>
  );
}

export default ReceiptProductList;
