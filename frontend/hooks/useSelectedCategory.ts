import { useState } from 'react';

export const useSelectedCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const clearSelectedCategory = () => {
    setSelectedCategory(null);
  };

  const updateSelectedCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return {
    selectedCategory,
    updateSelectedCategory,
    clearSelectedCategory,
  };
};
