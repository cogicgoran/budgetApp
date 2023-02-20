import { Category } from "@prisma/client";
import { RecentReceiptQuery } from "../repository/receipt";

export function buildRecentReceipts(recentReceipts: RecentReceiptQuery[]) {
  return recentReceipts.map((receipt) => {
    const total = receipt.articles.reduce(
      (total, article) => total + article.amount * article.unitPrice,
      0
    );
    const mostSpentCategory = getReceiptMostSpentCategory(receipt);
    return {
      ...receipt,
      total,
      mostSpentCategory,
    };
  });
}

export function buildRecentCategories(recentReceipts: RecentReceiptQuery[]) {
  const recentCategories = new Map<string, Category>();
  recentReceipts.slice().reverse().forEach((receipt) => {
    receipt.articles.some((article) => {
      if(!recentCategories.has(article.category.name)) {
        recentCategories.set(article.category.name, article.category);
      }
      if(recentCategories.size === 5) return true;
      return false;
    })
  })
  return Array.from(recentCategories.values());
}

export function getReceiptMostSpentCategory(receipt: RecentReceiptQuery) {
  const categoryPrices = new Map();
  receipt.articles.forEach((article) => {
    categoryPrices.set(
      article.category.id,
      (categoryPrices.get(article.category.id) ?? 0) +
        article.unitPrice * article.amount
    );
  });
  const maxObj = { id: null, value: -1 };
  categoryPrices.forEach((val, key) => {
    if (val > maxObj.value) {
      maxObj.id = key;
      maxObj.value = val;
    }
  });
  return receipt.articles.find((article) => article.category.id === maxObj.id)!
    .category;
}

export type RecentReceipt = ReturnType<typeof buildRecentReceipts>[number];
