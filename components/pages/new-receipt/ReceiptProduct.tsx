import React from "react";
import { useNewReceiptContext } from "../../../context/NewReceiptContext";
import { IconTrashCan } from "../../icons/TrashCan";
import { FormDataArticle } from "./ReceiptAddProduct";

interface Props {
  onRemoveArticle: Function;
  article: FormDataArticle;
  currencyId: string;
}

function ReceiptProduct({
  article,
  onRemoveArticle,
  currencyId
}: Props) {
  const {currencies} = useNewReceiptContext()
  function removeHandler() {
    onRemoveArticle(article.uuid);
  }

  const currencyCode = currencies.find(currency => currency.id.toString() === currencyId)?.code;

  return (
    <tr>
      <td>{article.name}</td>
      <td>
        <span>{article.category.name}</span>
      </td>
      <td>
        {article.price.toFixed(2)} {currencyCode}
      </td>
      <td onClick={removeHandler}>
        <IconTrashCan />
      </td>
    </tr>
  );
}

export default ReceiptProduct;
