import { Category, Currency, Marketplace } from "@prisma/client";
import { createContext, useContext } from "react";

interface INewReceiptContext {
  marketplaces: Marketplace[];
  categories: Category[];
  currencies: Currency[];
}

export const NewReceiptContext = createContext<INewReceiptContext>({
  categories: [],
  currencies: [],
  marketplaces: [],
});

export function useNewReceiptContext() {
  const context = useContext(NewReceiptContext);
  if (context === undefined)
    throw new Error(
      "Use context hook must be used within according context provider."
    );
  return context;
}
