import { useEffect, useState } from "react";
import { getMarketplaces } from "../utils/function/api.ts/dashboard";
import { toast } from "react-toastify";

export function useMarketplaces() {
  const [marketplaces, setMarketplaces] = useState<any[]>([]);
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

  return { marketplaces, isLoading };
}
