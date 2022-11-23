import React from "react";
import styles from "./dashboardMonthly.module.scss";
import { Trans } from "react-i18next";
import CategoryReceipt from "./CategoryReceipt";
import { useMonthlyReport } from "../../../hooks/useMonthlyReport";

function DashboardMonthly() {
  const { categories, total, isLoading } = useMonthlyReport();
  const categoriesExist = categories && categories.length > 0;

  const textCurrentMonth = (
    <Trans components={{ br: <br /> }}>currentMonth</Trans>
  );

  return (
    <div className={styles.dashboardCurrentMonth}>
      <div className={styles.dashboardCurrentMonthHeader}>
        <span>{textCurrentMonth}</span>
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
          <div className={styles.dashboardCurrentMonthTotal}>
            <span>
              {total} <br /> RSD
            </span>
          </div>
          <div className={styles.dashboardCurrentMonthCategories}>
            {categoriesExist
              ? categories.map((category: any) => {
                  return (
                    <CategoryReceipt
                      key={category.category_name}
                      {...category}
                    />
                  );
                })
              : "No categories"}
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardMonthly;
