"use client";

import Button from "@/components/common/button";
import Text from "../../text";

export default function Header() {
  const handleTitleClick = () => window.location.reload();

  return (
    <header className='flex items-center sticky top-0 w-full px-32 py-4 bg-white z-20'>
      <Button onClick={handleTitleClick}>
        <Text variant='title' content='스미스' />
      </Button>
    </header>
  );
}
