"use client";

import RecruitmentList from "@/components/recruitmentList";
import SortTypeSelect from "@/components/sortTypeSelect";

export default function Home() {
  return (
    <div className='flex gap-6 flex-1'>
      <div className='w-80'>필터</div>
      <div className='flex-1'>
        <div className='mb-6'>검색</div>
        <div className='flex justify-end mb-2'>
          <SortTypeSelect />
        </div>
        <RecruitmentList />
      </div>
    </div>
  );
}
