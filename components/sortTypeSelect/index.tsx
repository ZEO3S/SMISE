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
      <ul>
        {SORT_TYPES.map((sortType) => {
          return (
            <li key={sortType.value}>
              <Select.Option
                value={sortType.value}
                label={sortType.label}
                onSelect={() => updateSort(sortType)}
              />
            </li>
          );
        })}
      </ul>
    </Select>
  );
}
