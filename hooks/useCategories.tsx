import { Category } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCategories } from "../utils/function/api/category";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAndStoreCategories();
  }, []);

  async function getAndStoreCategories() {
    setIsLoading(true);
    try {
      const categories = await getCategories();
      setCategories(categories);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get categories");
    } finally {
      setIsLoading(false);
    }
  }

  function appendCategory(category: Category) {
    setCategories((prevState) => [...prevState, category]);
  }

  return { categories, isLoading, appendCategory };
}
