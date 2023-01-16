import { Category } from "@prisma/client";
import axios from "axios";

export async function getCategories(): Promise<Category[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/category`;
  const response = await axios.get(url);
  return response.data;
}

export async function createCategory(payload: unknown) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/category`;
  const response = await axios.post(url, payload);
  return response.data;
}
