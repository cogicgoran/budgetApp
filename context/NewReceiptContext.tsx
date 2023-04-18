import { Category, Currency, Marketplace } from "@prisma/client";
import { createContext, useContext } from "react";

interface IReceiptContext {
  marketplaces: Marketplace[];
  categories: Category[];
  currencies: Currency[];
}

export const ReceiptContext = createContext<IReceiptContext>({
  categories: [],
  currencies: [],
  marketplaces: [],
});

export function useReceiptContext() {
  const context = useContext(ReceiptContext);
  if (context === undefined)
    throw new Error(
      "Use context hook must be used within according context provider."
    );
  return context;
}
