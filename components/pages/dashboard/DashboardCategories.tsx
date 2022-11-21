import React from "react";
import styles from "./dashboardCategories.module.scss";
import { useTranslation } from "react-i18next";
import { PATHS } from "../../../utils/constants";
import Link from "next/link";
import DashboardLatestCategory from "./DashboardLatestCategory";

function DashboardCategories() {
  const { t } = useTranslation();
  const textCategories = t("categories");
  const textSeeMore = t("seeMore");

  return (
    <div className={styles.dashboardCategoriesWrapper}>
      <h2>{textCategories}</h2>
      <div className={styles.dashboardCategories}>
        <DashboardLatestCategory category="food" />
        <DashboardLatestCategory category="gas" />
        <DashboardLatestCategory category="groceries" />
        <DashboardLatestCategory category="groceries" />
        <DashboardLatestCategory category="groceries" />
        <Link href={PATHS.CATEGORIES}>
          <button>{textSeeMore}</button>
        </Link>
      </div>
    </div>
  );
}

export default DashboardCategories;
