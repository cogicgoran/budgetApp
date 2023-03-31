import { Marketplace } from "@prisma/client";
import axios from "axios";
import { AddMarketplacePayload } from "../../../components/pages/marketplace/NewMarketplace";
import { IMarketplace } from "../../../types/marketplace";

export async function getMarketplaces(): Promise<IMarketplace[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/marketplace`;
  const response = await axios.get(url);
  return response.data;
}

export async function createNewMarketplace(payload: AddMarketplacePayload): Promise<Marketplace> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/marketplace`;
  const response = await axios.post(url, payload);
  return response.data;
}
