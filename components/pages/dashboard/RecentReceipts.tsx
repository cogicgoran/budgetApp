import React from "react";
import Link from "next/link";
import Receipt from "./Receipt";
import { IconFileLines } from "../../icons/FileLines";
import { useTranslation } from "react-i18next";
import { useRecentReceipts } from "../../../hooks/useRecentReceipts";
import { PATHS } from "../../../utils/constants";
import styles from "./recentReceipts.module.scss";
import Button from "../../UI/button/Button";

function RecentReceipts() {
  const { t } = useTranslation();
  const textRecentReceipts = t("recentReceipts");
  const textSeeMore = t("seeMore");
  const textAddNew = t("addNew");
  const textNoReceipts = t("noReceipts");
  const { receipts, isLoading } = useRecentReceipts();

  return (
    <div className={styles.dashboardRecent}>
      <h2>{textRecentReceipts}</h2>
      <div>
        {isLoading && <p>Loading...</p>}
        {!isLoading &&
          receipts.length > 0 &&
          receipts.map((receipt) => {
            return <Receipt key={receipt.id} {...receipt} />;
          })}
        {!isLoading && receipts.length === 0 && (
          <div className={styles.dashboardNoRecentResults}>
            <IconFileLines />
            <span>{textNoReceipts}</span>{" "}
          </div>
        )}
        <div className={styles.dashboardRecentControls}>
          <Link key="seeMore" href={PATHS.VIEW_RECEIPTS}>
            <Button actionType="info" type="button">
              {textSeeMore}
            </Button>
          </Link>
          <Link key="addReceipt" href={PATHS.NEW_RECEIPTS}>
            <Button actionType="success" type="button">
              {textAddNew}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecentReceipts;
