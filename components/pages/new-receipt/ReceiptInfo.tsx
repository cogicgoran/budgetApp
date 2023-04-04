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
import Datepicker from "react-datepicker";

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

  const date = formMethods.watch("date");

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
      </div>
      <div className={classNames("flex items-center gap-1", "mb-1")}>
        <label htmlFor="date">{textDate}:</label>
        <Datepicker
          selected={date}
          showTimeInput
          onChange={(date) => {
            formMethods.setValue("date", date);
          }}
          dateFormat="MMM dd,yyyy HH:mm"
          timeFormat="p"
        />
      </div>
      <div className={classNames("flex items-center gap-1", "mb-1")}>
        <label htmlFor="currency">{textCurrency}:</label>
        <SelectCustom name="currency" options={currencyOptions} />
      </div>
    </div>
  );
}

export default ReceiptInfo;
