import { Dispatch, SetStateAction, useState } from "react";

import { SORT_TYPES } from "@/constants/components/sort";
import { Sort } from "@/types/api/recruitment";
import { SelectOption } from "@/types/components/select";

export const useUpdateSort = (
  setSort: Dispatch<SetStateAction<Sort | null>>
) => {
  const [selectedSortOption, setSelectedSortOption] = useState(SORT_TYPES[0]);

  const updateSort = (option: SelectOption) => {
    const selectedValue = option.value;

    const isSortType = (value: string): value is Sort => {
      return Object.values(SORT_TYPES).some(
        (sortType) => sortType.value === value
      );
    };

    if (!isSortType(selectedValue)) return;

    setSelectedSortOption(option);
    setSort(selectedValue);
  };

  return { selectedSortOption, setSelectedSortOption, updateSort };
};
