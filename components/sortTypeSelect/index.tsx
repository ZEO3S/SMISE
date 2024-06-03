import { Dispatch, SetStateAction } from "react";

import Select from "../common/select";

import { Sort } from "@/types/api/recruitment";
import { SORT_TYPES } from "@/constants/components/sort";
import { useUpdateSort } from "@/hooks/useUpdateSort";

interface Props {
  setSort: Dispatch<SetStateAction<Sort | null>>;
}

export default function SortTypeSelect({ setSort }: Props) {
  const { selectedSortOption, updateSort } = useUpdateSort(setSort);

  return (
    <Select selectedOption={selectedSortOption}>
      {SORT_TYPES.map((sortType) => {
        return (
          <Select.Option
            value={sortType.value}
            label={sortType.label}
            onSelect={() => updateSort(sortType)}
          />
        );
      })}
    </Select>
  );
}
