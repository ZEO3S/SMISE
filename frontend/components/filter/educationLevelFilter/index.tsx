import { EDUCATION_LEVELS } from '@/constants/api/educationLevel';
import { PARAMS } from '@/constants/api/queryParams';

import Select from '@/components/common/select';
import Text from '@/components/common/text';

import { usePushRouteWithQueryParam } from '@/hooks/usePushRouteWithQueryParam';

export default function EducationLevelFilter() {
  const { pushRoute } = usePushRouteWithQueryParam();

  return (
    <div className='pt-2 pb-4'>
      <div className='py-2'>
        <Text variant='semi-title' content='학력' />
      </div>
      <Select
        initialValue={{
          value: EDUCATION_LEVELS[0],
          label: EDUCATION_LEVELS[0],
        }}
        onChange={(selectedOption) => pushRoute(PARAMS.EDUCATION_LEVEL, selectedOption ? selectedOption.value : '')}
      >
        <ul>
          {EDUCATION_LEVELS.map((educationLevel) => (
            <li key={educationLevel}>
              <Select.Option
                option={{
                  value: educationLevel,
                  label: educationLevel,
                }}
              />
            </li>
          ))}
        </ul>
      </Select>
    </div>
  );
}
