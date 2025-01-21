import { generateCityId } from '@/utils/location';

import { District } from '@/types/api/location';

import { LOCATIONS } from '@/constants/components/location';

import Checkbox from '@/components/common/checkbox';

interface Props {
  cities: string[] | null;
  district: District;
  addCity: (id: string) => void;
  deleteCity: (id: string) => void;
}

export default function CitiesCheckbox({ cities, district, addCity, deleteCity }: Props) {
  return (
    <ul className='flex-1 overflow-y-scroll'>
      {LOCATIONS[district].map((city) => {
        const id = generateCityId(district, city);

        return (
          <li key={id}>
            <Checkbox
              value={city}
              label={city}
              defaultChecked={cities?.includes(id)}
              boxPosition='right'
              textVariant='full-base'
              onCheck={() => addCity(id)}
              onUnCheck={() => deleteCity(id)}
              padding
              hover
              rounded
            />
          </li>
        );
      })}
    </ul>
  );
}
