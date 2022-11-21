import React from "react";
import styles from "./dashboardMonthly.module.scss";

interface Props {
  category_name: string;
  category_value: number;
}

function CategoryReceipt(props: Props) {
  return (
    <div className={styles["dashboardCurrentMonthCategory"]}>
      <span>{props.category_name}</span>
      <span>{props.category_value} RSD</span>
    </div>
  );
}

export default CategoryReceipt;
