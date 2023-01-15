import React, { createContext, useContext, useState } from "react";
import categoryStyleSheet, {
  categoryColors,
  getIconByName,
} from "../../utils/common";
import styles from "./addCategory.module.scss";
import CategoryColorPicker from "./CategoryColorPicker";
import CategoryIconPicker from "./CategoryIconPicker";

interface Props {
  onCancel: any;
}

export type ColorScheme = typeof categoryColors[number];

const DEFAULT_COLOR_SCHEME = categoryColors[0];
const DEFAULT_ICON_INDEX = 20;

interface ICategoryPickerContext {
  colorScheme: ColorScheme;
  setColorScheme: React.Dispatch<
    React.SetStateAction<{
      color: string;
      borderColor: string;
    }>
  >;
  iconIndex: number;
  setIconIndex: React.Dispatch<React.SetStateAction<number>>;
  categoryName: string;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
  showIconPicker: boolean;
  setShowIconPicker: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryPickerContext = createContext<ICategoryPickerContext | {}>({});

function AddCategory({ onCancel }: Props) {
  const [colorScheme, setColorScheme] = useState(DEFAULT_COLOR_SCHEME);
  const [iconIndex, setIconIndex] = useState(DEFAULT_ICON_INDEX);
  const [categoryName, setCategoryName] = useState("");
  const [showIconPicker, setShowIconPicker] = useState(false);

  const contextValue: ICategoryPickerContext = {
    colorScheme,
    setColorScheme,
    iconIndex,
    setIconIndex,
    categoryName,
    setCategoryName,
    showIconPicker,
    setShowIconPicker,
  };

  return (
    <div className={styles.addCategoryContainer}>
      <CategoryPickerContext.Provider value={contextValue}>
        <CategoryColorPicker onCancel={onCancel} />
        {showIconPicker && <CategoryIconPicker onCancel={onCancel} />}
      </CategoryPickerContext.Provider>
    </div>
  );
}

export function useCategoryPickerContext() {
  const context = useContext(CategoryPickerContext);
  if (context === undefined)
    throw new Error(
      "useContext must be used withing corresponding context provider"
    );
  return context as ICategoryPickerContext;
}

export default AddCategory;
