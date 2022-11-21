import React from "react";
import CategoryCard from "../../category/CategoryCard";
import Link from "next/link";
import { IconEye } from "../../icons/Eye";
import { IconPenToSquare } from "../../icons/PenToSquare";
import { IconTrashCan } from "../../icons/TrashCan";
import { PATHS } from "../../../utils/constants";
import styles from "./receiptRow.module.scss";

interface Props {
  receipt_id: number;
  mostSpentCategory: {
    catName: string;
  };
  receipt_date: string;
  shop_name: string;
  receipt_price: number;
  currency: string;
}

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Receipt(props: Props) {
  const date = new Date(props.receipt_date);

  return (
    <article className={styles.dashboardReceipt}>
      <CategoryCard category={props.mostSpentCategory.catName} />
      <div>{props.shop_name}</div>
      <div>
        {weekday[date.getDay()]},{" "}
        {date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>
      <div>
        {props.receipt_price} {props.currency}
      </div>
      <div className={styles.dashboardReceiptActions}>
        <Link href={PATHS.VIEW_RECEIPTS + "/" + props.receipt_id}>
          <IconEye />
        </Link>
        <Link href={PATHS.EDIT_RECEIPTS + "/" + props.receipt_id}>
          <IconPenToSquare />
        </Link>
        <div>
          <IconTrashCan />
        </div>
      </div>
    </article>
  );
}

export default Receipt;
