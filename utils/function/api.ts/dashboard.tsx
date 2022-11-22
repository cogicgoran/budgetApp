import axios from "axios";

export async function getMonthlyReport() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/receipts/current-month`;
  const report = await axios.get(url);
  return report;
}
