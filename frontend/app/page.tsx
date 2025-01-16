'use client';

import Filter from '@/components/filter';
import Recruitment from '@/components/recruitment';
import SearchBar from '@/components/searchBar';
import SortTypeSelect from '@/components/sortTypeSelect';

import { useRecruitment } from '@/hooks/useRecruitment';

export default function Home() {
  const {
    jobs,
    locations,
    recruitment,
    isLoading,
    error,
    hasNext,
    updateServiceStatus,
    updateJobs,
    updateLocations,
    updateEducationLevel,
    updateExperienceLevel,
    updateKeyword,
    updateSort,
    fetchNextPage,
  } = useRecruitment();

  return (
    <div className='flex flex-1 gap-10 px-40 py-10'>
      <Filter
        selectedDefaultJobs={jobs}
        locations={locations}
        updateLocations={updateLocations}
        updateEducationLevel={updateEducationLevel}
        updateExperienceLevel={updateExperienceLevel}
        updateServiceStatus={updateServiceStatus}
        updateJobs={updateJobs}
      />
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
