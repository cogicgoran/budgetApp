import React, { useState, useEffect, useMemo } from "react";
import styles from "./recentReceipts.module.scss";
import { useTranslation } from "react-i18next";

import Link from "next/link";
import { PATHS } from "../../../utils/constants";
import { handleIncomingArticles } from "../../../utils/function/common";
import { IconFileLines } from "../../icons/FileLines";
import { useHttp } from "../../../hooks/useHttp";
import Receipt from "./Receipt";

function RecentReceipts() {
  const { t } = useTranslation();
  const textRecentReceipts = t("recentReceipts");
  const textSeeMore = t("seeMore");
  const textAddNew = t("addNew");
  const textNoReceipts = t("noReceipts");
  const [data, setData] = useState(null);
  const { isLoading, error, fetchTask } = useHttp();

  const receiptsRequestConfig = {
    url: "http://localhost:8000/api/receipts/latest",
    method: "GET",
  };

  useEffect(() => {
    fetchTask(receiptsRequestConfig, handleReceiptsResponse);
  }, []);

  function handleReceiptsResponse(response: any) {
    setData(response.data);
  }

  const receipts = useMemo(() => {
    return data ? handleIncomingArticles(data) : null;
  }, [data]);

  var dataResponse;
  if (receipts && receipts.length > 0) {
    dataResponse = receipts.map((receipt) => {
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
        {!isLoading && error && <div>{error.message}</div>}
        {!isLoading && !error && dataResponse}
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
