import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getMonthlyReport, MonthlyReport } from "../utils/function/api/receipt";
import { handleIncomingArticles } from "../utils/function/common";

export function useMonthlyReport() {
  const [monthlyReport, setReceipts] = useState<MonthlyReport>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getReport();
  }, []);

  async function getReport() {
    setIsLoading(true);
    try {
      const reportData = await getMonthlyReport();
      setReceipts(reportData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get monthly report");
    } finally {
      setIsLoading(false);
    }
  }

  return { monthlyReport, isLoading };
}
