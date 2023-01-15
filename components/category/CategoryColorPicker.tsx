import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavigationOptions } from "swiper/types/modules/navigation";
import { CSSSelector } from "swiper/types/shared";
import { categoryColors } from "../../utils/common";
import { IconChevronLeft } from "../icons/ChevronLeft";
import { IconChevronRight } from "../icons/ChevronRight";
import styles from "./addCategory.module.scss";
import CategoryShowcase from "./CategoryShowcase";
import ColorItem from "./ColorItem";
import "swiper/css";
import "swiper/css/navigation";
import type SwiperClass from "swiper";
import { ColorScheme, useCategoryPickerContext } from "./AddCategory";
import { flushSync } from "react-dom";
import classNames from "classnames";

interface Props {
  onCancel: any;
}

function CategoryColorPicker({ onCancel }: Props) {
  const { iconIndex, colorScheme, setColorScheme } = useCategoryPickerContext();
  const { t } = useTranslation();
  const textAdd = t("add");
  const textAddCategory = t("addCategory");
  const textCancel = t("cancel");
  const swiperRef = useRef<HTMLDivElement | null>(null);
  const swiperInstanceRef = useRef<SwiperClass | null>(null);
  const isFirstRenderRef = useRef(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    isFirstRenderRef.current = false;
  }, []);

  function onInit(swiper: SwiperClass) {
    swiperInstanceRef.current = swiper;
  }

  function updateColors(newColorScheme: ColorScheme) {
    flushSync(() => {
      setColorScheme((prevState) => {
        if (newColorScheme.color === prevState.color) return prevState;
        return newColorScheme;
      });
    });
  }

  function handleProgress(swiper: SwiperClass) {
    if (isFirstRenderRef.current) return;
    const newIndex = swiper.realIndex;

    if (newIndex == undefined) return;
    const newColorScheme = { ...categoryColors[newIndex] };
    updateColors(newColorScheme);
  }

  useEffect(() => {
    setTimeout(() => {
      let centerElement = swiperRef.current?.querySelector(
        `.${styles.colorPickerActiveSlide}`
      );
      if (centerElement) return;
      const nextElement =
        swiperRef.current?.querySelector(".swiper-slide-next");

      if (!nextElement) {
        console.log("no next");
        return;
      }
      centerElement = nextElement.previousElementSibling!;
      centerElement?.classList.add(styles.colorPickerActiveSlide);
    }, 0);
  }, [colorScheme.color]);

  function handleTransitionStart(swiper: SwiperClass) {
    if (isFirstRenderRef.current) return;
    const newColorScheme = { ...categoryColors[swiper.realIndex] };
    updateColors(newColorScheme);
  }

  return (
    <div className={styles.categoryColorSelect}>
      <h3 className={styles.addCategoryTitle}>{textAddCategory}</h3>
      <CategoryShowcase />

      <div style={{ position: "relative" }}>
        <Swiper
          modules={[Navigation]}
          ref={swiperRef as any}
          slidesPerView={9}
          grabCursor
          centeredSlides
          loop={true}
          onInit={onInit}
          onSlideChangeTransitionEnd={handleTransitionStart} // hack for fixing active class not being added to centered item
          loopedSlides={categoryColors.length}
          slideActiveClass={styles.colorPickerActiveSlide}
          className={styles.swiperColorWraper}
          watchSlidesProgress
          onProgress={handleProgress}
          style={{ padding: "2px 0" }}
        >
          {categoryColors.map((colorScheme) => (
            <SwiperSlide
              key={colorScheme.color}
              className={styles.colorPickerItem}
              style={{
                backgroundColor: colorScheme.color,
                outlineColor: colorScheme.borderColor,
              }}
            />
          ))}
        </Swiper>
        <div
          className={classNames(styles.sliderColorPrev, styles.sliderColorArrow)}
          ref={prevRef}
          onClick={() => {
            swiperInstanceRef.current!.slidePrev();
          }}
        >
          <PrevArrow />
        </div>
        <div
          className={classNames(styles.sliderColorNext, styles.sliderColorArrow)}
          ref={nextRef}
          onClick={() => {
            swiperInstanceRef.current!.slideNext();
          }}
        >
          <NextArrow />
        </div>
      </div>

      <div className={styles.addCategoryControls}>
        <button className={styles.addCategoryCancel} onClick={onCancel}>
          {textCancel}
        </button>
        {/* <button className={styles.addCategoryConfirm} onClick={onSubmit}>
          {textAdd}
        </button> */}
      </div>
    </div>
  );
}

export function NextArrow({ onClick }: { onClick?: any }) {
  return (
    <span onClick={onClick}>
      <IconChevronRight />
    </span>
  );
}

export function PrevArrow({ onClick }: { onClick?: any }) {
  return (
    <span onClick={onClick}>
      <IconChevronLeft />
    </span>
  );
}

export default CategoryColorPicker;
