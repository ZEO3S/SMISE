import Image from 'next/image';

import ArrowSVG from '@/assets/svgs/arrow.svg';

import { Location } from '@/types/api/location';

import Button from '@/components/common/button';
import Text from '@/components/common/text';

interface Props {
  locations: Array<Location> | null;
  openModal: () => void;
}

export default function ModalOpenButton({ locations, openModal }: Props) {
  const citiesLength = locations
    ? locations.reduce((acc, cur) => {
        return acc + cur.cities.length;
      }, 0)
    : 0;

  return (
    <Button className='flex gap-1 w-full py-2 hover:bg-default-color hover:bg-opacity-10' onClick={openModal}>
      <>
        <Text content={locations && Boolean(locations.length) ? locations[0].district : '전체'} />
        {locations && Boolean(locations.length) && (
          <>
            <Text content='·' />
            <Text content={locations[0].cities[0]} />
            {Boolean(citiesLength - 1) && <Text content={`외 ${citiesLength - 1}`} />}
          </>
        )}
        <Image
          className='ml-1 -rotate-90 select-none border border-default-color rounded'
          src={ArrowSVG}
          alt='모달 열기 버튼'
        />
      </>
    </Button>
  );
}
