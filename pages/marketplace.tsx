import React, { useState } from "react";
import styles from "../components/pages/marketplace/marketplace.module.scss";
import ReactDOM from "react-dom";
import MarketplaceList from "../components/pages/marketplace/MarketplaceList";
import Backdrop from "../components/UI/backdrop/Backdrop";
import NewMarketplace from "../components/pages/marketplace/NewMarketplace";
import Modal from "../components/UI/modal/Modal";
import { Marketplace } from "@prisma/client";
import { useMarketplaces } from "../hooks/useMarketplaces";

function MarketplacePage() {
  const [showModal, setShowModal] = useState(false);
  const { marketplaces, isLoading, prependNewMarketplace } = useMarketplaces();

  function handleSuccess(newMarketplace: Marketplace) {
    prependNewMarketplace(newMarketplace);
    setShowModal(false);
  }

  return (
    <div className={styles.marketplaces}>
      <button
        className={styles["new-marketplace__show-btn"]}
        onClick={() => {
          setShowModal(true);
        }}
      >
        + ADD MARKETPLACE
      </button>
      <MarketplaceList
        marketplaces={marketplaces}
        isLoading={isLoading}
        openAddMarketplaceModal={() => setShowModal(true)}
      />
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
          <Modal>
            <NewMarketplace
              onCancel={() => setShowModal(false)}
              onSuccess={handleSuccess}
            />
          </Modal>,
          document.getElementById("overlay-root")!
        )}
    </div>
  );
}

export default MarketplacePage;
