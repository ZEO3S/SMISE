import { PARAMS } from '@/constants/api/queryParams';
import { SORT_TYPES } from '@/constants/components/sort';

import { usePushRouteWithQueryParam } from '@/hooks/usePushRouteWithQueryParam';

import Select from '../common/select';

export default function SortTypeSelect() {
  const { pushRoute } = usePushRouteWithQueryParam();

  return (
    <Select
      initialValue={{
        value: SORT_TYPES[0],
        label: SORT_TYPES[0],
      }}
      onChange={(selectedOption) => pushRoute(PARAMS.SORT, selectedOption ? selectedOption.value : '')}
    >
      <ul>
        {SORT_TYPES.map((sortType) => {
          return (
            <li key={sortType}>
              <Select.Option
                option={{
                  value: sortType,
                  label: sortType,
                }}
              />
            </li>
          );
        })}
      </ul>
    </Select>
  );
}
