"use client";

import Button from "@/components/common/button";
import Text from "../../text";

export default function Header() {
  const handleTitleClick = () => window.location.reload();

  return (
    <header className='flex items-center min-h-16 px-32'>
      <Button onClick={handleTitleClick}>
        <Text variant='title' content='스미스' />
      </Button>
    </header>
  );
}
