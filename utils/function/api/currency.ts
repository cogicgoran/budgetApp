import axios from "axios";
import { Currency } from "../../../types/currency";

export async function getCurrencies(): Promise<Currency[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/currency`;
  const response = await axios.get(url);
  return response.data;
}

export async function createCurrency(payload: any) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/currency`;
  const response = await axios.post(url, payload);
  return response.data;
}
