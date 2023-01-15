import React from "react";
import { useTranslation } from "react-i18next";
import { IconChevronLeft } from "../icons/ChevronLeft";
import { IconChevronRight } from "../icons/ChevronRight";
import { ColorScheme } from "./AddCategory";
import styles from "./addCategory.module.scss";
import CategoryShowcase from "./CategoryShowcase";

interface Props {
  onCancel: any;
}

function CategoryIconPicker({ onCancel }: Props) {
  const { t } = useTranslation();
  const textAdd = t("add");
  const textAddCategory = t("addCategory");
  const textCancel = t("cancel");

  return <div className={styles.categoryColorSelect}></div>;
}

export default CategoryIconPicker;
