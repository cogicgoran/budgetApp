import React, { useEffect, useMemo, useState } from "react";
import styles from "./dashboardMonthly.module.scss";
import { Trans } from "react-i18next";
import { useHttp } from "../../../hooks/useHttp";
import { handleIncomingArticles } from "../../../utils/function/common";
import CategoryReceipt from "./CategoryReceipt";

function DashboardMonthly() {
  const [receipts, setReceipts] = useState(null);
  const { isLoading, error, fetchTask } = useHttp();

  const receiptsRequestConfig = {
    url: "http://localhost:8000/api/receipts/current-month",
    method: "GET",
  };

  useEffect(() => {
    fetchTask(receiptsRequestConfig, handleReceiptsResponse);
  }, []);

  var [categories, total] = useMemo(() => {
    return receipts ? handleIncomingArticles(receipts) : [null, null];
  }, [receipts]);

  const textCurrentMonth = (
    <Trans components={{ br: <br /> }}>currentMonth</Trans>
  );

  var display;

  if (categories && categories.length > 0) {
    display = categories.map((category: any) => {
      return <CategoryReceipt key={category.category_name} {...category} />;
    });
  } else {
    display = "No cats";
  }

  function handleReceiptsResponse(response: any) {
    setReceipts(response.data);
  }

  return (
    <div className={styles.dashboardCurrentMonth}>
      <div className={styles.dashboardCurrentMonthHeader}>
        <span>{textCurrentMonth}</span>
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !error && (
        <>
          <div className={styles.dashboardCurrentMonthTotal}>
            <span>
              {total} <br /> RSD
            </span>
          </div>
          <div className={styles.dashboardCurrentMonthCategories}>
            {display}
          </div>
        </>
      )}
      {!isLoading && error && <div>{error.message}</div>}
    </div>
  );
}

export default DashboardMonthly;
