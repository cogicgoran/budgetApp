import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getMonthlyReport } from "../utils/function/api/receipt";
import { handleIncomingArticles } from "../utils/function/common";

export function useMonthlyReport() {
  const [[categories, total], setReceipts] = useState<any>([null, null]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getReport();
  }, []);

  async function getReport() {
    setIsLoading(true);
    try {
      const reportData = (await getMonthlyReport()) as any;
      const report = handleIncomingArticles(reportData);
      setReceipts(report);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get monthly report");
    } finally {
      setIsLoading(false);
    }
  }

  return {categories, total, isLoading};
}
