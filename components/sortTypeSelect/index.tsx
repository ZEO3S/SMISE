import { Dispatch, SetStateAction } from "react";

import Select from "../common/select";

import { Option } from "@/types/components/select";
import { Sort } from "@/types/api/recruitment";

const SORT_TYPES = [
  { value: "최신순", label: "최신순" },
  { value: "마감순", label: "마감순" },
];

interface Props {
  setSort: Dispatch<SetStateAction<Sort>>;
}

export default function SortTypeSelect({ setSort }: Props) {
  const updateSort = (option: Option) => {
    const selectedValue = option.value;

    const isSortType = (value: string | null): value is Sort => {
      return Object.values(SORT_TYPES).some(
        (sortType) => sortType.value === value
      );
    };

    if (isSortType(selectedValue)) setSort(selectedValue);
  };

  return <Select options={SORT_TYPES} onSelect={updateSort} />;
}
