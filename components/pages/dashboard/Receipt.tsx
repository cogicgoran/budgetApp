import React from "react";
import CategoryCard from "../../category/CategoryCard";
import Link from "next/link";
import { IconEye } from "../../icons/Eye";
import { IconPenToSquare } from "../../icons/PenToSquare";
import { IconTrashCan } from "../../icons/TrashCan";
import { PATHS } from "../../../utils/constants";
import styles from "./receiptRow.module.scss";
import cn from "classnames";
import { DashboardReceipt } from "../../../hooks/useRecentReceipts";
import CategoryPill from "../../UI/category-pill/CategoryPill";
import { getColorSchemeByMainColor } from "../../../utils/common";
import { atom, useAtom } from "jotai";
import { viewReceiptAtom } from "../../../store/atoms";
import { deleteReceipt } from "../../../utils/function/api/receipt";
import { toast } from "react-toastify";
import { getResponseErrorMessage } from "../../../utils/function/common";

export const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];



export function formatCurrencyNumberText(price: number, code: string) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
    currencyDisplay: "code",
  })
    .format(price)
    .replace(code, "")
    .trim();
}

interface Props extends DashboardReceipt {
  onDelete: (_receiptId: number) => void;
}

function Receipt(props: Props) {
  const [_, setViewedReceiptId] = useAtom(viewReceiptAtom);
  const date = new Date(props.date);

  return (
    <article
      className={cn(
        "grid items-center gap-x-[2px]",
        "px-2 py-0.5",
        "border border-solid border-[#90c3d0] rounded",
        "mb-1",
        "text-xs",
        styles.dashboardReceipt
      )}
    >
      <CategoryPill
        iconName={props.mostSpentCategory.icon}
        mainColor={props.mostSpentCategory.color}
      >
        {props.mostSpentCategory.name}
      </CategoryPill>
      <div>{props.shopName}</div>
      <div>
        {weekday[date.getDay()]},{" "}
        {date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>
      <div data-testid="priceCurrency" className="text-[#660000] text-left">
        {formatCurrencyNumberText(props.price, props.currency)} {props.currency}
      </div>
      <div className={styles.dashboardReceiptActions}>
        <button onClick={() => {
          setViewedReceiptId(props.id)
        }}>
          {/* <a> */}
            <IconEye />
          {/* </a> */}
        </button>
        <Link href={PATHS.EDIT_RECEIPTS + "/" + props.id}>
          <a>
            <IconPenToSquare />
          </a>
        </Link>
        <span onClick={() => {
          (async function () {
            try {
              await deleteReceipt(props.id);
              // onDelete(receipt.id);
              props.onDelete(props.id)
              toast.success("Receipt deleted");
            } catch (error) {
              console.log(error);
              toast.error(getResponseErrorMessage(error));
            }
          })();
        }}>
          <IconTrashCan />
        </span>
      </div>
    </article>
  );
}

export default Receipt;
