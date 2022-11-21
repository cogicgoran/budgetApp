import React from 'react';
import { IconTrashCan } from '../../icons/TrashCan';
import styles from './receiptProduct.module.css';

interface Props {
    onRemoveArticle: Function;
    id: number
    name: string;
    category: string;
    price: number;
    currency: string;
}

function ReceiptProduct(props: Props) {
  function removeHandler() {
    props.onRemoveArticle(props.id);
  }

  return (
    <tr>
      <td>{props.name}</td>
      <td><span>{props.category}</span></td>
      <td>{props.price.toFixed(2)} {props.currency}</td>
      <td onClick={removeHandler}>
        {/* <FontAwesomeIcon className={styles['receipt-product-icon']} icon={solid('trash-alt')}/> */}
        <IconTrashCan />
        </td>
    </tr>
  );
};

export default ReceiptProduct;
