import React from "react";
import categoryStyleSheet from "../../utils/common";
import styles from "./categoryCard.module.scss";

interface Props {
    category: string;
}

function CategoryCard({ category }: Props) {
  const catInfo = categoryStyleSheet[category.toLowerCase()] || categoryStyleSheet[20];
  return (
    <div>
      <span style={{backgroundColor:catInfo.color, borderColor:catInfo.border}} className={styles["category-small"]}></span>
    </div>
  );
}

export default CategoryCard;