import { useState } from "react";

export const useSelectedCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const clearSelectedCategory = () => {
    setSelectedCategory(null);
  };

  const updateSelectedCategory = (Category: string) => {
    setSelectedCategory(Category);
  };

  return {
    selectedCategory,
    updateSelectedCategory,
    clearSelectedCategory,
  };
};
