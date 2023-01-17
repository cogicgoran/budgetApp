import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuthService } from "../../config/firebase/service";
import styles from "../../components/pages/categories/categories.module.scss";
import { useTranslation } from "react-i18next";
import { getColorSchemeByMainColor, getIconByName } from "../../utils/common";
import { useState } from "react";
import { IconCirclePlus } from "../../components/icons/CirclePlus";
import { createPortal } from "react-dom";
import Backdrop from "../../components/UI/backdrop/Backdrop";
import AddCategory from "../../components/category/AddCategory";
import { useCategories } from "../../hooks/useCategories";
import { Category } from "@prisma/client";
import classNames from "classnames";
import CategoryShowcase from "../../components/category/CategoryShowcase";

const CategoryPage: NextPage = () => {
  const [user] = useAuthState(firebaseAuthService);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const textCategories = t("categories");
  const { categories, appendCategory } = useCategories();

  function addCategoryListener(category: Category) {
    appendCategory(category);
  }

  return (
    <div className={styles.categories}>
      <h2>{textCategories}</h2>
      <div className={styles.categoryContainer}>
        {categories &&
          categories.map((category, index) => {
            const colorScheme = getColorSchemeByMainColor(category.color)!;
            const icon = getIconByName(category.icon)!.icon
            return (
              // <div
              //   key={index}
              //   style={{ borderColor: colorScheme?.borderColor }}
              //   className={styles.categoryWrapper}
              // >
              //   <div
              //     style={{ color: colorScheme?.color }}
              //     className={styles.categoryIcon}
              //   >
              //     {getIconByName(category.icon)?.icon()}
              //   </div>
              //   <div
              //     style={{
              //       backgroundColor: colorScheme?.color,
              //       borderColor: colorScheme?.borderColor,
              //     }}
              //     className={classNames('flex justify-center items-center decoration-white border-t-2 border-solid font-light text-[0.6rem] p-0.5 h-[20px] uppercase')}
              //   >
              //     {category.name}
              //   </div>
              // </div>
              <CategoryShowcase
                key={category.id}
                colorScheme={colorScheme}
                icon={icon}
                name={category.name}
              />
            );
          })}
      </div>
      <div className={styles.categoryAddBtn} onClick={() => setShowModal(true)}>
        <IconCirclePlus />
      </div>
      {showModal &&
        createPortal(
          <AddCategory
            onAddCategory={addCategoryListener}
            onCancel={() => setShowModal(false)}
          />,
          document.getElementById("overlay-root")!
        )}
      {showModal &&
        createPortal(
          <Backdrop onCancel={() => setShowModal(false)} />,
          document.getElementById("backdrop-root")!
        )}
    </div>
  );
};

export default CategoryPage;
