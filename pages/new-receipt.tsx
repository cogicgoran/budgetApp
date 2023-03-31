import type { NextPage } from "next";
import { useTranslation } from "react-i18next";
import styles from "../components/pages/new-receipt/newReceipt.module.scss";
import ReceiptForm from "../components/forms/ReceiptForm";
import { useMarketplaces } from "../hooks/useMarketplaces";
import { useCategories } from "../hooks/useCategories";
import { useCurrencies } from "../hooks/useCurrencies";
import { NewReceiptContext } from "../context/NewReceiptContext";

export function isReceiptInfoValid(info: any) {
  const { marketplace, date, currency } = info;
  if (
    typeof marketplace === "string" &&
    typeof date === "string" &&
    typeof currency === "string" &&
    marketplace.length > 0 &&
    date.length > 0 &&
    currency.length > 0 &&
    isFinite(new Date(date) as any)
  ) {
    return true;
  }
  return false;
}

const NewReceiptPage: NextPage = () => {
  const { t } = useTranslation();
  const { categories } = useCategories();
  const { marketplaces } = useMarketplaces();
  const { currencies } = useCurrencies();
  const textNewReceipt = t("newReceipt");

  const contextValue = {
    categories,
    marketplaces,
    currencies,
  }

  return (
    <NewReceiptContext.Provider
      value={contextValue}
    >
      <div className={styles["new-receipt"]}>
        <h3>{textNewReceipt}</h3>
        <ReceiptForm />
      </div>
    </NewReceiptContext.Provider>
  );
};

export default NewReceiptPage;
