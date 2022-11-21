import React, { useEffect, useMemo, useState } from "react";
import { useHttp } from "../../../hooks/useHttp";
import MarketplaceItem from "./MarketplaceItem";
import styles from "./marketplaceList.module.scss";

interface Props {
    onNoMarketplaces: any;
}

function MarketplaceList(props: Props) {
  const [marketplaces, setMarketplaces] = useState<any>(null);
  const { isLoading, error, fetchTask } = useHttp();

  const marketplaceRequestConfig = {
    url: "http://localhost:8000/api/marketplaces",
    method: "GET",
  };

  useEffect(() => {
    fetchTask(marketplaceRequestConfig, handleMarketplaceResponse);
  }, []);

  function handleMarketplaceResponse(response: any) {
    setMarketplaces(response.data);
  }

  const display = useMemo(() => {
    return marketplaces && marketplaces.length > 0 ? (
      <table className={styles["marketplace-list__table"]}>
        <thead>
          <th>id</th>
          <th>Name</th>
          <th>Address</th>
          <th></th>
        </thead>
        <tbody>
          {marketplaces.map((marketplace: any) => (
            <MarketplaceItem key={marketplace.id} marketplace={marketplace} />
          ))}
        </tbody>
      </table>
    ) : (
      <div>
        No Marketplaces found. You can add one{" "}
        <button onClick={props.onNoMarketplaces}>
          <i>here</i>
        </button>
      </div>
    );
  }, [marketplaces, props.onNoMarketplaces]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && error && <div>{error.message}</div>}
      {!isLoading && !error && display}
    </div>
  );
}

export default MarketplaceList;
