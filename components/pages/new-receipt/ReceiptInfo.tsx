import React, { ChangeEvent } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { PATHS } from "../../../utils/constants";
import { useNewReceiptContext } from "../../../context/NewReceiptContext";
import { IconCirclePlus } from "../../icons/CirclePlus";
import { useFormContext } from "react-hook-form";
import NewProductSelect from "../../forms/NewProductSelect";
import classNames from "classnames";
import SelectCustom from "../../forms/SelectCustom";
import Datepicker from 'react-datepicker';

function ReceiptInfo() {
  const { t } = useTranslation();
  const { marketplaces, currencies } = useNewReceiptContext();
  const textMarketplace = t("marketplace");
  const textDate = t("date");
  const textCurrency = t("currency");
  const textChoose = t("choose");
  const formMethods = useFormContext();


  const marketplaceOptions = marketplaces.map(({ id, address, name }) => ({
    value: id,
    label: `${name} ${address}`,
  }));

  const currencyOptions = currencies.map((currency) => ({
    value: currency.id,
    label: currency.code,
  }));


  const date = formMethods.watch('date');
  console.log(date);

  return (
    <div>
      <div className={classNames("flex items-center gap-1", "mb-1")}>
        <label htmlFor="marketplace">{textMarketplace}:</label>
        <SelectCustom name="marketplace" options={marketplaceOptions} />
        <Link href="/marketplace">
          <a>
            <IconCirclePlus className={classNames("w-[20px] h-[20px]")} />
          </a>
        </Link>
        {/* {marketplaces.length < 1 && (
          <span>
            There are no marketplaces found in the database. You can add one{" "}
            <Link href={PATHS.MARKETPLACES}>
              <i>here</i>
            </Link>
          </span>
        )} */}
      </div>
      <div className={classNames("flex items-center gap-1", "mb-1")}>
        <label htmlFor="date">{textDate}:</label>
        {/* <SelectCustom name="date" options={marketplaceOptions} /> */}
        <Datepicker showTimeInput onChange={(date) => {
          formMethods.setValue('date', date);
        }} value={date.toString()} />
      </div>

      {/* <NewProductSelect
        label={textMarketplace}
        name="marketplace"
        options={marketplaceOptions}
      /> */}
      {/* </div> */}

      {/* <div className={styles.receiptInfoItem}>
        <label htmlFor="date">{textDate}:</label>
        <input
          type="datetime-local"
          name="date"
          id="date"
          value={props.value.date}
          onChange={changeHandler}
        />
      </div> */}
      <SelectCustom name="currency" options={currencyOptions} />
      {/* <NewProductSelect
        label={textCurrency}
        name="currency"
        options={currencyOptions}
      /> */}
    </div>
  );
}

export default ReceiptInfo;
