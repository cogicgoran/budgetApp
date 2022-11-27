import axios from "axios";
import { IMarketplace } from "../../../types/marketplace";

export async function getMarketplaces(): Promise<IMarketplace[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/marketplace`;
  const response = await axios.get(url);
  return response.data;
}
