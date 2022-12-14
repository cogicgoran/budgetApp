import axios from "axios";

export async function getMonthlyReport(): Promise<any> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/receipts/currentMonth`;
  const report = await axios.get(url);
  return report;
}

export async function getRecentReceipts(): Promise<any> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/receipts/latest`;
  const receipts = await axios.get(url);
  return receipts;
}

export async function createReceipt(payload: any) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/receipts`;
  const response = await axios.post(url, payload);
  return response.data;
}
