import React from "react";
import styles from "./dashboardMonthly.module.scss";
import { Trans } from "react-i18next";
import CategoryReceipt from "./CategoryReceipt";
import { useMonthlyReport } from "../../../hooks/useMonthlyReport";

function DashboardMonthly() {
  const { monthlyReport, isLoading } = useMonthlyReport();

  const textCurrentMonth = (
    <Trans components={{ br: <br /> }}>currentMonth</Trans>
  );

  return (
    <div className={styles.dashboardCurrentMonth}>
      <div className={styles.dashboardCurrentMonthHeader}>
        <span>{textCurrentMonth}</span>
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && monthlyReport !== undefined &&
        <>
          <div className={styles.dashboardCurrentMonthTotal}>
            <span>
              {monthlyReport.total} <br /> {monthlyReport.currency}
            </span>
          </div>
          <div className={styles.dashboardCurrentMonthCategories}>
            {monthlyReport.perCategory.length > 0 
              ? monthlyReport.perCategory.map((categoryData) => {
                  return (
                    <CategoryReceipt
                      key={categoryData.category.id}
                      categoryName={categoryData.category.name}
                      categoryTotal={categoryData.total}
                      categoryMainColor={categoryData.category.color}
                      categoryIcon={categoryData.category.icon}
                    />
                  );
                })
              : "No data"}
          </div>
        </>
      }
    </div>
  );
}

export default DashboardMonthly;
