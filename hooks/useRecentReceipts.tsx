import { useEffect, useState } from "react";
import { getRecentReceipts } from "../utils/function/api.ts/dashboard";
import { toast } from "react-toastify";
import { handleIncomingArticles } from "../utils/function/common";

export function useRecentReceipts() {
  const [receipts, setReceipts] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getReceipts();
  }, []);

  async function getReceipts() {
    setIsLoading(true);
    try {
      const receiptsData = (await getRecentReceipts()) as any;
      const receipts = handleIncomingArticles(receiptsData);
      setReceipts(receipts);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get recent receipts");
    } finally {
      setIsLoading(false);
    }
  }

  return { receipts, isLoading };
}
