import React from "react";
import { useTranslation } from "react-i18next";
import { PATHS } from "../../../utils/constants";
import Link from "next/link";
import { Category } from "@prisma/client";
import CategoryShowcase from "../../category/CategoryShowcase";
import {
  getColorSchemeByMainColor,
  getIconByName,
} from "../../../utils/common";
import cn from "classnames";

interface Props {
  categories: Category[];
  isLoading: boolean;
}

function DashboardCategories({ categories, isLoading }: Props) {
  const { t } = useTranslation();
  const textCategories = t("categories");
  const textSeeMore = t("seeMore");

  return (
    <div className={cn("min-h-[100px] px-4 py-6 bg-white")}>
      <h2 className={cn(
        "m-0 mb-2 py-0 px-4 text-base font-normal text-[#0a1f24] uppercase"
      )}>{textCategories}</h2>
      <div className={cn("flex gap-x-8 justify-start")}>
        {!isLoading &&
          categories.map((category) => {
            return (
              <CategoryShowcase
                key={category.id}
                colorScheme={getColorSchemeByMainColor(category.color)!}
                icon={getIconByName(category.icon!)?.icon!}
                name={category.name}
                isDashboard
                className={cn("my-0 mx-0")}
              />
            );
          })}
        <Link href={PATHS.CATEGORIES}>
          <button>{textSeeMore}</button>
        </Link>
        {isLoading && "Loading..."}
      </div>
    </div>
  );
}

export default DashboardCategories;
