import axios from "axios";

export async function getMonthlyReport(): Promise<any> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/receipts/current-month`;
  const report = await axios.get(url);
  return report;
}

export async function getRecentReceipts(): Promise<any> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/receipts/latest`;
  const receipts = await axios.get(url);
  return receipts;
}

export async function getMarketplaces(): Promise<any> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/marketplaces`;
  const marketplaces = await axios.get(url);
  return marketplaces;
}

export async function getCurrencies(): Promise<any> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/currencies`;
  const currencies = await axios.get(url);
  return currencies;
}

export async function createCurrency(payload: any) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/currencies`;
  const response = await axios.post(url, payload);
  return response.data;
}

export async function createReceipt(payload: any) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/receipts`;
  const response = await axios.post(url, payload);
  return response.data;
}
