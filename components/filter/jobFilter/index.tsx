import Image from "next/image";

import ArrowSVG from "@/assets/svgs/arrow.svg";
import Text from "@/components/common/text";

export default function JobFilter() {
  return (
    <div className='py-2'>
      <div className='py-2'>
        <Text variant='semi-title' content='직군' />
      </div>
      <div className='flex gap-1 py-2 cursor-pointer'>
        <Text content='개발' />
        <Text content='·' />
        <Text content='머신러닝 엔지니어' />
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
