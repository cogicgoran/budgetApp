import { Category } from "@prisma/client";
import axios from "axios";
import { RecentReceipt } from "../../../server/service/receipt";

export async function getMonthlyReport(): Promise<{
  currency: string;
  perCategory: {
    category: Category;
    total: number;
  }[];
  total: number;
}> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/receipt/currentMonth`;
  const response = await axios.get(url);
  return response.data;
}

export async function getRecentReceipts(): Promise<{recentReceipts:RecentReceipt[], recentCategories: Category[]}> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/receipt/recentReceipts`;
  const response = await axios.get(url);
  return response.data;
}

export async function createReceipt(payload: any) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/receipt`;
  const response = await axios.post(url, payload);
  return response.data;
}

export type MonthlyReport = Awaited<ReturnType<typeof getMonthlyReport>>
