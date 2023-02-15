import { Receipt } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RecentReceipt } from "../server/service/receipt";
import { getRecentReceipts } from "../utils/function/api/receipt";

export type DashboardReceipt = ReturnType<typeof mapToDashboardReceipts>[number]

function mapToDashboardReceipts(receipts: RecentReceipt[]) {
  return receipts.map(receipt => ({
    id: receipt.id,
    date: receipt.date,
    price: receipt.total,
    currency: receipt.currency.code,
    shopName: receipt.marketplace.address,
    mostSpentCategory: receipt.mostSpentCategory
  }))
}

export function useRecentReceipts() {
  const [receipts, setReceipts] = useState<DashboardReceipt[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getReceipts();
  }, []);

  async function getReceipts() {
    setIsLoading(true);
    try {
      const receiptsData = await getRecentReceipts();
      const receiptsFormatted = mapToDashboardReceipts(receiptsData)
      setReceipts(receiptsFormatted);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get recent receipts");
    } finally {
      setIsLoading(false);
    }
  }

  return { receipts, isLoading };
}
