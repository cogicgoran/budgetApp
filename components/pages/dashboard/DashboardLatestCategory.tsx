import React from "react";
import categoryStyleSheet from "../../../utils/common";
import styles from "./dashboardLatestCategory.module.scss";

interface Props {
  category: string;
}

function DashboardLatestCategory({ category }: Props) {
  const catInfo =
    categoryStyleSheet[category.toLowerCase()] || categoryStyleSheet[20];
  return (
    <div
      style={{ borderColor: catInfo.color }}
      className={styles.dashboardLatestCategory}
    >
      <div
        style={{ color: catInfo.color }}
        className={styles.dashboardLatestCategoryImage}
      >
        {catInfo.icon()}
      </div>
      <div
        style={{ backgroundColor: catInfo.color, color: catInfo.textColor }}
        className={styles.dashboardLatestCategoryName}
      >
        {category}
      </div>
    </div>
  );
}

export default DashboardLatestCategory;
