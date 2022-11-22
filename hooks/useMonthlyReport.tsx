import { useEffect, useMemo, useState } from "react";
import { getMonthlyReport } from "../utils/function/api.ts/dashboard";
import { toast } from "react-toastify";
import { handleIncomingArticles } from "../utils/function/common";

export function useMonthlyRepost() {
  const [receipts, setReceipts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getReport();
  }, []);

  var [categories, total] = useMemo(() => {
    return receipts ? handleIncomingArticles(receipts) : [null, null];
  }, [receipts]);

  async function getReport() {
    setIsLoading(true);
    try {
      const report = (await getMonthlyReport()) as any;
      setReceipts(report);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get monthly report");
    } finally {
      setIsLoading(false);
    }
  }

  return {receipts, categories, total, isLoading};
}
