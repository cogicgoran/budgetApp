import { Category } from "@prisma/client";
import axios from "axios";
import { RecentReceipt } from "../../../server/service/receipt";
import { ReceiptQueryResultItem } from "../../../server/repository/receipt";

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

export async function getReceiptsView(): Promise<{
  items: ReceiptQueryResultItem[];
}> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/receipt/view`;
  const response = await axios.get(url);
  return response.data;
}

export async function getRecentReceipts(): Promise<{
  recentReceipts: RecentReceipt[];
  recentCategories: Category[];
}> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/receipt/recentReceipts`;
  const response = await axios.get(url);
  return response.data;
}

export async function createReceipt(payload: any) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/receipt`;
  const response = await axios.post(url, payload);
  return response.data;
}

export async function updateReceipt(receiptId: number, payload: any) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/receipt/${receiptId}`;
  const response = await axios.put(url, payload);
  return response.data;
}


export async function getReceipt(id: number, abortController: AbortController) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/receipt/${id}`;
  const response = await axios.get(url, {
    signal: abortController.signal,
  });
  return response.data;
}

export async function deleteReceipt(id: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/receipt/${id}`;
  const response = await axios.delete(url);
  return response.data;
}

export async function populateScanResults(query:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/receipt/populate?query=${query}`;
  const response = await axios.get(url);
  return response.data;
}

export type MonthlyReport = Awaited<ReturnType<typeof getMonthlyReport>>;
