import classNames from "classnames";
import React from "react";
import { getColorSchemeByMainColor } from "../../../utils/common";
import CategoryPill from "../../UI/category-pill/CategoryPill";
import styles from "./dashboardMonthly.module.scss";
import { formatCurrencyNumberText } from "./Receipt";

interface Props {
  categoryName: string;
  categoryTotal: number;
  categoryMainColor: string;
  categoryIcon: string;
}

function CategoryReceipt({
  categoryName,
  categoryTotal,
  categoryMainColor,
  categoryIcon,
}: Props) {

  return (
    <div className={styles["dashboardCurrentMonthCategory"]}>
      <CategoryPill
        iconName={categoryIcon}
        mainColor={categoryMainColor}
      >
        {categoryName}
      </CategoryPill>
      <span className="text-[#660000]">{formatCurrencyNumberText(categoryTotal, "RSD")} RSD</span>
    </div>
  );
}

export default CategoryReceipt;
