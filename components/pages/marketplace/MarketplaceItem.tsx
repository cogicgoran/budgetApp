import React from "react";
import { IconTrashCan } from "../../icons/TrashCan";
import styles from "./marketplaceItem.module.scss";

interface Props {

}

function MarketplaceItem(props: any) {
  return (
    <tr>
      <td>{props.marketplace.id}</td>
      <td>{props.marketplace.name}</td>
      <td>{props.marketplace.address}</td>
      <td>
        {/* <FontAwesomeIcon
          className={styles["marketplace-list__item-icon"]}
          icon={solid("trash-alt")}
        /> */}
        <IconTrashCan />
      </td>
    </tr>
  );
}

export default MarketplaceItem;
