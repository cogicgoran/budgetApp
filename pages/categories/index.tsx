import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuthService } from "../../config/firebase/service";
import styles from '../../components/pages/categories/categories.module.scss'
import { useTranslation } from "react-i18next";
import { getIconByName } from "../../utils/common";
import { useState } from "react";
import { IconCirclePlus } from "../../components/icons/CirclePlus";
import { createPortal } from "react-dom";
import Backdrop from "../../components/UI/backdrop/Backdrop";
import AddCategory from "../../components/category/AddCategory";

const CategoryPage: NextPage = () => {
  const [user] = useAuthState(firebaseAuthService);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const {t} = useTranslation();
  const textCategories = t("categories");

  if (!user) {
    router.push("/auth");
    return null;
  }
  const categories = [] as any[];

  return (
    <div className={styles.categories}>
      <h2>{textCategories}</h2>
      <div className={styles.categoryContainer}>
        {categories &&
          categories.map((category,index) => {
            return (
              <div
              key={index}
                style={{ borderColor: category.color_border }}
                className={styles.categoryWrapper}
              >
                <div
                  style={{ color: category.color_main }}
                  className={styles.categoryIcon}
                >
                  {getIconByName(category.icon_name)()}
                </div>
                <div
                  style={{
                    backgroundColor: category.color_main,
                    borderColor: category.color_border,
                  }}
                  className={styles.categoryName}
                >
                  {category.name}
                </div>
              </div>
            );
          })}
      </div>
      <div className={styles.categoryAddBtn} onClick={() => 
            setShowModal(true)
          }>
            <IconCirclePlus />
      </div>
      {showModal &&
        createPortal(
            <AddCategory
              // onAddCategory={() => handleAddCategory()}
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
