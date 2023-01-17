import React, { ReactNode } from "react";
import styles from "./addCategory.module.scss";
import { ColorScheme } from "../../utils/common";
import cn from "classnames";

interface Props {
  colorScheme: ColorScheme;
  icon: () => ReactNode;
  name: string;
  readonly?: boolean;
  onChange?: any;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onShowcaseClick?: any;
  showcasePlaceholder?: string;
  isSliderOverlay?: boolean;
}

function CategoryShowcase({
  colorScheme,
  icon,
  name,
  readonly = true,
  onChange,
  onClick,
  onShowcaseClick,
  showcasePlaceholder,
  isSliderOverlay = false,
}: Props) {
  return (
    <div
      style={{ borderColor: colorScheme.borderColor }}
      className={cn(
        "w-[100px]",
        "border-2 border-solid rounded-t-2xl",
        "my-[12px] mx-auto",
        { "absolute top-2 left-1/2 translate-x-[-50%]": isSliderOverlay }
      )}
      onClick={onShowcaseClick}
    >
      <div
        style={{ color: colorScheme.color }}
        className={cn(
          "flex justify-center items-center",
          "h-[80px]",
          styles.categoryShowcaseImage
        )}
      >
        {icon()}
      </div>
      <input
        className={cn(
          "block w-full border-0 border-t-2 border-solid",
          "text-center uppercase text-ellipsis whitespace-nowrap",
          "text-[14px] text-white",
          "focus:outline-0",
          styles.categoryShowcaseName
        )}
        style={{
          backgroundColor: colorScheme.color,
          borderColor: colorScheme.borderColor,
        }}
        type="text"
        placeholder={!readonly ? showcasePlaceholder : ""}
        value={name}
        disabled={readonly}
        onClick={onClick}
        onChange={onChange}
      />
      {name && <p className={styles.tooltipText}>{name}</p>}
    </div>
  );
}

export default CategoryShowcase;
