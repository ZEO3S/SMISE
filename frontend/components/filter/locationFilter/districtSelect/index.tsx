import Image from 'next/image';

import ArrowSVG from '@/assets/svgs/arrow.svg';

import { District } from '@/types/api/location';
import { isValidDistrict } from '@/types/guards/queryParams';

import { LOCATIONS } from '@/constants/components/location';

import Button from '@/components/common/button';
import Text from '@/components/common/text';

interface Props {
  clearSelectedDistrict: () => void;
  updateDistrict: (district: District) => void;
}

export default function DistrictSelect({ clearSelectedDistrict, updateDistrict }: Props) {
  const handleClickAllLocations = () => clearSelectedDistrict();

  const handleClickButton = (district: string) => {
    if (!isValidDistrict(district)) return;

    updateDistrict(district);
  };

  return (
    <ul className='overflow-y-scroll'>
      <Button
        className='flex justify-between w-60 p-4 cursor-pointer rounded hover:bg-default-color hover:bg-opacity-10'
        onClick={handleClickAllLocations}
      >
        <Text variant='full-base' content='전체' />
      </Button>
      {Object.keys(LOCATIONS).map((location) => {
        return (
          <li key={location}>
            <Button
              className='flex justify-between w-60 p-4 cursor-pointer rounded hover:bg-default-color hover:bg-opacity-10'
              onClick={() => handleClickButton(location)}
            >
              <Text variant='full-base' content={location} />
              <Image className='ml-1 -rotate-90 select-none' src={ArrowSVG} alt='상세 행정구역 열기 버튼' />
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
