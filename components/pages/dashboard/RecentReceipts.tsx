import React from "react";
import Link from "next/link";
import Receipt from "./Receipt";
import { IconFileLines } from "../../icons/FileLines";
import { useTranslation } from "react-i18next";
import { useRecentReceipts } from "../../../hooks/useRecentReceipts";
import { PATHS } from "../../../utils/constants";
import styles from "./recentReceipts.module.scss";

function RecentReceipts() {
  const { t } = useTranslation();
  const textRecentReceipts = t("recentReceipts");
  const textSeeMore = t("seeMore");
  const textAddNew = t("addNew");
  const textNoReceipts = t("noReceipts");
  const { receipts, isLoading } = useRecentReceipts();

  var dataResponse;
  if (receipts && receipts.length > 0) {
    dataResponse = receipts.map((receipt: any) => {
      return <Receipt key={receipt.receipt_id} {...receipt} />;
    });
  } else {
    dataResponse = (
      <div className={styles.dashboardNoRecentResults}>
        <IconFileLines />
        <span>{textNoReceipts}</span>{" "}
      </div>
    );
  }

  return (
    <div className={styles.dashboardRecent}>
      <h2>{textRecentReceipts}</h2>
      <div>
        {isLoading && <p>Loading...</p>}
        {!isLoading && dataResponse}
        <div className={styles.dashboardRecentControls}>
          <Link key="seeMore" href={PATHS.VIEW_RECEIPTS}>
            <button type="button">{textSeeMore}</button>
          </Link>
          <Link key="addReceipt" href={PATHS.NEW_RECEIPTS}>
            <button type="button">{textAddNew}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecentReceipts;
