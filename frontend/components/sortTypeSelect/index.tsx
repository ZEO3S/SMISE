import { useState } from 'react';

import { SelectOption } from '@/types/components/select';

import { SORT_TYPES } from '@/constants/components/sort';

import Select from '../common/select';

interface Props {
  updateSort: (sortType: SelectOption) => void;
}

export default function SortTypeSelect({ updateSort }: Props) {
  const [selectedSortOption, setSelectedSortOption] = useState(SORT_TYPES[0]);

  return (
    <Select selectedOption={selectedSortOption}>
      <ul>
        {SORT_TYPES.map((sortType) => {
          return (
            <li key={sortType.value}>
              <Select.Option
                value={sortType.value}
                label={sortType.label}
                onSelect={() => {
                  updateSort(sortType);
                  setSelectedSortOption(sortType);
                }}
              />
            </li>
          );
        })}
      </ul>
    </Select>
  );
}
