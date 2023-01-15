import React from "react";
import styles from "./addCategory.module.scss";
import { useTranslation } from "react-i18next";
import { getIconByName } from "../../utils/common";
import { useCategoryPickerContext } from "./AddCategory";

function CategoryShowcase() {
  const { colorScheme, iconIndex, categoryName, setCategoryName, setShowIconPicker } =
    useCategoryPickerContext();
  const { t } = useTranslation();
  const textTypeHere = t("typeHere");

  const icon = getIconByName(iconIndex);

  return (
    <div
      style={{ borderColor: colorScheme.borderColor }}
      className={styles.categoryShowcase}
      onClick={() => setShowIconPicker(prevState => !prevState)}
    >
      <div
        style={{ color: colorScheme.color }}
        className={styles.categoryShowcaseImage}
      >
        {icon()}
      </div>
      <div
        style={{
          backgroundColor: colorScheme.color,
          borderColor: colorScheme.borderColor,
        }}
        className={styles.categoryShowcaseName}
      >
        <input
          className={styles.categoryShowcaseInput}
          type="text"
          placeholder={textTypeHere}
          value={categoryName}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        {categoryName && <p className={styles.tooltipText}>{categoryName}</p>}
      </div>
    </div>
  );
}

export default CategoryShowcase;
