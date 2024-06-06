import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import ArrowSVG from "@/assets/svgs/arrow.svg";
import Text from "@/components/common/text";

import { Locations } from "@/types/api/recruitment";

interface Props {
  setLocations: Dispatch<SetStateAction<Locations | null>>;
}

export default function LocationFilter({ setLocations }: Props) {
  return (
    <div className='py-2'>
      <div className='py-2'>
        <Text variant='semi-title' content='지역' />
      </div>
      <div className='flex gap-1 py-2 cursor-pointer'>
        <Text content='서울' />
        <Text content='·' />
        <Text content='마포구' />
        <Text content='외 1' />
        <Image
          className='ml-1 -rotate-90 select-none border border-default-color rounded'
          src={ArrowSVG}
          alt='모달 열기 버튼'
        />
      </div>
    </div>
  );
}
