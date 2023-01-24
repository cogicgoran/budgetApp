import React, { ChangeEvent } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { PATHS } from "../../../utils/constants";
import styles from "./receiptInfo.module.scss";
import { useMarketplaces } from "../../../hooks/useMarketplaces";
import { useCurrencies } from "../../../hooks/useCurrencies";
import { useNewReceiptContext } from "../../../context/NewReceiptContext";

interface Props {
  onChangeValue: Function;
  value: any;
}

function ReceiptInfo(props: Props) {
  const { t } = useTranslation();
  const { marketplaces, currencies } = useNewReceiptContext();
  const textMarketplace = t("marketplace");
  const textDate = t("date");
  const textCurrency = t("currency");
  const textChoose = t("choose");

  function changeHandler(e: ChangeEvent<any>) {
    props.onChangeValue((prevState: any) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <div className={styles.receiptWrapper}>
      <div className={styles.receiptInfoItem}>
        <label htmlFor="marketplace">{textMarketplace}:</label>

        {!!marketplaces.length && (
          <select
            name="marketplace"
            id="marketplace"
            value={props.value.marketplace}
            onChange={changeHandler}
          >
            <option hidden value="">
              {textChoose}
            </option>
            {marketplaces.map((marketplace: any) => (
              <option key={marketplace.id} value={marketplace.id}>
                {marketplace.name} {marketplace.address}
              </option>
            ))}
          </select>
        )}
        {!marketplaces.length && (
          <span>
            There are no marketplaces found in the database. You can add one{" "}
            <Link href={PATHS.MARKETPLACES}>
              <i>here</i>
            </Link>
          </span>
        )}
      </div>

      <div className={styles.receiptInfoItem}>
        <label htmlFor="date">{textDate}:</label>
        <input
          type="datetime-local"
          name="date"
          id="date"
          value={props.value.date}
          onChange={changeHandler}
        />
      </div>

      <div className={styles.receiptInfoItem}>
        <label htmlFor="currency">{textCurrency}:</label>
        {currencies.length && (
          <select
            name="currency"
            id="currency"
            value={props.value.currency}
            onChange={changeHandler}
          >
            <option hidden value="">
              {textChoose}
            </option>
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.id}>
                {currency.code}
              </option>
            ))}
          </select>
        )}
        {!currencies.length && (
          <span>
            There are no currencies found in the database. You can add one{" "}
            <Link href={PATHS.CURRENCIES}>
              <i>here</i>
            </Link>
          </span>
        )}
      </div>
    </div>
  );
}

export default ReceiptInfo;
