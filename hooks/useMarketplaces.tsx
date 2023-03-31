import { Marketplace } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IMarketplace } from "../types/marketplace";
import { getMarketplaces } from "../utils/function/api/marketplace";

export function useMarketplaces() {
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAndStoreMarketplaces();
  }, []);

  async function getAndStoreMarketplaces() {
    setIsLoading(true);
    try {
      const marketplaces = (await getMarketplaces()) as any;
      setMarketplaces(marketplaces);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get marketplaces");
    } finally {
      setIsLoading(false);
    }
  }

  function prependNewMarketplace(marketplace: Marketplace) {
    setMarketplaces((previousMarketplaces) => [
      marketplace,
      ...previousMarketplaces,
    ]);
  }

  return { marketplaces, isLoading, prependNewMarketplace };
}
