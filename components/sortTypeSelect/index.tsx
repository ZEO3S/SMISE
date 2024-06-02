import { useState } from "react";

import Select from "../common/select";

import { Option } from "@/types/components/select";

const SORT_TYPES = [
  { value: "마감순", label: "마감순" },
  { value: "최신순", label: "최신순" },
];

export default function SortTypeSelect() {
  const [selectedOption, setSelectedOption] = useState<Option>(SORT_TYPES[0]);

  return (
    <Select
      options={SORT_TYPES}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
    />
  );
}
