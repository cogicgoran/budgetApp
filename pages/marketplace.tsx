import React, { useState } from "react";
import styles from "../components/pages/marketplace/marketplace.module.scss";
import ReactDOM from "react-dom";
import MarketplaceList from "../components/pages/marketplace/MarketplaceList";
import Backdrop from "../components/UI/backdrop/Backdrop";
import NewMarketplace from "../components/pages/marketplace/NewMarketplace";

function MarketplacePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.marketplaces}>
      <MarketplaceList onNoMarketplaces={() => setShowModal(true)} />
      <button
        className={styles["new-marketplace__show-btn"]}
        onClick={() => {
          setShowModal(true);
        }}
      >
        + ADD MARKETPLACE
      </button>
      {showModal &&
        ReactDOM.createPortal(
          <Backdrop onCancel={() => setShowModal(false)} />,
          document.getElementById("backdrop-root")!
        )}
      {showModal &&
        ReactDOM.createPortal(
          <NewMarketplace onCancel={() => setShowModal(false)} />,
          document.getElementById("overlay-root")!
        )}
    </div>
  );
}

export default MarketplacePage;
