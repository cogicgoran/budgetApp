import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperClass from "swiper";

import styles from "./addCategory.module.scss";
import categoryStyleSheet, { categoryIcons } from "../../utils/common";
import classNames from "classnames";
import TransparentCategoryShowcase from "./TransparentCategoryShowcase";
import { NextArrow, PrevArrow } from "./CategoryColorPicker";
import { flushSync } from "react-dom";
import { useCategoryPickerContext } from "./AddCategory";
interface Props {
  onCancel: any;
}

function CategoryIconPicker({ onCancel }: Props) {
  const { setIconIndex, colorScheme } = useCategoryPickerContext();
  const swiperRef = useRef<HTMLDivElement | null>(null);
  const swiperInstanceRef = useRef<SwiperClass | null>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    isFirstRenderRef.current = false;
  }, []);

  function updateIcon(newIndex: number) {
    flushSync(() => {
      setIconIndex(newIndex);
    });
  }

  function onInit(swiper: SwiperClass) {
    swiperInstanceRef.current = swiper;
  }

  function handleProgress(swiper: SwiperClass) {
    if (isFirstRenderRef.current) return;
    const newIndex = swiper.realIndex;

    if (newIndex == undefined) return;
    updateIcon(newIndex);
  }

  function handleTransitionStart(swiper: SwiperClass) {
    if (isFirstRenderRef.current) return;
    const newIndex = swiper.realIndex;
    updateIcon(newIndex);
  }

  return (
    <div className={classNames(styles.categoryColorSelect, "iconPicker")}>
      <div style={{ position: "relative" }}>
        <Swiper
          ref={swiperRef as any}
          slidesPerView={7}
          grabCursor
          centeredSlides
          loop={true}
          onInit={onInit}
          onSlideChangeTransitionStart={handleTransitionStart}
          loopedSlides={categoryIcons.length}
          className={styles.swiperIconWrapper}
          watchSlidesProgress
          onProgress={handleProgress}
        >
          {categoryIcons.map((icon) => (
            <SwiperSlide
              key={icon.toString()}
              className={styles.iconPickerSlide}
              style={{ color: colorScheme.color }}
            >
              {icon()}
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={classNames(styles.sliderIconPrev, styles.sliderIconArrow)}
          ref={prevRef}
          onClick={() => {
            swiperInstanceRef.current!.slidePrev();
          }}
        >
          <PrevArrow />
        </div>
        <div
          className={classNames(styles.sliderIconNext, styles.sliderIconArrow)}
          ref={nextRef}
          onClick={() => {
            swiperInstanceRef.current!.slideNext();
          }}
        >
          <NextArrow />
        </div>
        <TransparentCategoryShowcase />
      </div>
    </div>
  );
}

export default CategoryIconPicker;
