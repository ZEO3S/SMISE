'use client';

import Filter from '@/components/filter';
import Recruitment from '@/components/recruitment';
import SearchBar from '@/components/searchBar';
import SortTypeSelect from '@/components/sortTypeSelect';

import { useRecruitment } from '@/hooks/useRecruitment';

export default function Home() {
  const {
    jobs,
    recruitment,
    isLoading,
    error,
    hasNext,
    updateJobs,
    updateExperienceLevel,
    updateKeyword,
    updateSort,
    fetchNextPage,
  } = useRecruitment();

  return (
    <div className='flex flex-1 gap-10 px-40 py-10'>
      <Filter selectedDefaultJobs={jobs} updateJobs={updateJobs} updateExperienceLevel={updateExperienceLevel} />
      <div className='flex flex-col flex-1'>
        <div className='sticky top-16 pb-4 bg-white'>
          <SearchBar updateKeyword={updateKeyword} />
        </div>
        <div className='flex justify-end sticky top-32 mb-2 bg-white'>
          <SortTypeSelect updateSort={updateSort} />
        </div>
        <Recruitment
          recruitment={recruitment}
          isLoading={isLoading}
          error={error}
          hasNext={hasNext}
          fetchNextPage={fetchNextPage}
        />
      </div>
    </div>
  );
}
