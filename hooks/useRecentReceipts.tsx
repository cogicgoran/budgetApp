import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getRecentReceipts } from "../utils/function/api/receipt";
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
      const receiptsData = (await getRecentReceipts());
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
