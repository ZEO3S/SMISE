"use client";

import Button from "@/components/common/button";

export default function Header() {
  const handleTitleClick = () => window.location.reload();

  return (
    <header className='flex items-center min-h-16 px-32'>
      <Button onClick={handleTitleClick}>
        <h1 className='text-2xl font-black'>스미스</h1>
      </Button>
    </header>
  );
}
