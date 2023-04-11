import React from "react";
import { useNewReceiptContext } from "../../../context/NewReceiptContext";
import { IconTrashCan } from "../../icons/TrashCan";
import { FormDataArticle } from "./ReceiptAddProduct";
import classNames from "classnames";

interface Props {
  onRemoveArticle: Function;
  article: FormDataArticle;
  currency: string | undefined;
}

function ReceiptProduct({ article, onRemoveArticle, currency }: Props) {
  function removeHandler() {
    onRemoveArticle(article.uuid);
  }

  return (
    <tr>
      <td className={classNames("px-[3px] py-[1px]")}>{article.name}</td>
      <td className={classNames("px-[3px] py-[1px]")}>
        <span>{article.category.name}</span>
      </td>
      <td className={classNames("px-[3px] py-[1px]")}>
        {article.price.toFixed(2)} {currency}
      </td>
      <td className={classNames("px-[3px] py-[1px]")}>{article.amount.toFixed(3)}</td>
      <td className={classNames("px-[3px] py-[1px]")}>
        {(article.price * article.amount).toFixed(2)} {currency}
      </td>
      <td onClick={removeHandler} className={classNames("px-[3px] py-[1px]")}>
        <div className={classNames("flex justify-center items-center")}>
          <span className={classNames(
                  "p-1",
                  "transition-colors cursor-pointer rounded-[50%]",
                  "hover:bg-[#90c3d0] hover:text-[grey]"
                )}>
            <IconTrashCan className={classNames("w-[14px]")} />
          </span>
        </div>
      </td>
    </tr>
  );
}

export default ReceiptProduct;


// TODO: work on styling the table