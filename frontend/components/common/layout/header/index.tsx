'use client';

import Button from '@/components/common/button';

import Text from '../../text';

export default function Header() {
  const handleTitleClick = () => window.location.reload();

  return (
    <header className='flex shrink-0 items-center sticky top-0 w-full h-16 px-32 bg-white z-10'>
      <Button onClick={handleTitleClick}>
        <Text variant='title' content='스미스' />
      </Button>
    </header>
  );
}
