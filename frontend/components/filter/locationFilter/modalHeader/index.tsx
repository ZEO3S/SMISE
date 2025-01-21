import Image from 'next/image';

import CloseSVG from '@/assets/svgs/close.svg';

import Button from '@/components/common/button';
import Text from '@/components/common/text';

interface Props {
  closeModal: () => void;
}

export default function ModalHeader({ closeModal }: Props) {
  return (
    <div className='flex justify-between'>
      <Text variant='title' content='지역' />
      <Button onClick={closeModal}>
        <Image className='select-none' src={CloseSVG} alt='모달 닫기 버튼' />
      </Button>
    </div>
  );
}
