"use client";

import { useState } from "react";

import Filter from "@/components/filter";
import SearchBar from "@/components/searchBar";
import SortTypeSelect from "@/components/sortTypeSelect";
import RecruitmentList from "@/components/recruitmentList";

import { DefaultRequestRecruitmentParams } from "@/types/api/recruitment";

const DEFAULT_PARAMS: DefaultRequestRecruitmentParams = {
  SERVICE_TYPE: null,
  SERVICE_STATUS: null,
  JOBS: null,
  LOCATIONS: null,
  EDUCATION_LEVEL: null,
  EXPERIENCE_LEVEL: null,
  SORT: "최신순",
  KEYWORD: null,
};

export default function Home() {
  const [serviceType, setServiceType] = useState(DEFAULT_PARAMS.SERVICE_TYPE);
  const [serviceStatus, setServiceStatus] = useState(
    DEFAULT_PARAMS.SERVICE_STATUS
  );
  const [jobs, setJobs] = useState(DEFAULT_PARAMS.JOBS);
  const [locations, setLocations] = useState(DEFAULT_PARAMS.LOCATIONS);
  const [educationLevel, setEducationLevel] = useState(
    DEFAULT_PARAMS.EDUCATION_LEVEL
  );
  const [experienceLevel, setExperienceLevel] = useState(
    DEFAULT_PARAMS.EXPERIENCE_LEVEL
  );
  const [sort, setSort] = useState(DEFAULT_PARAMS.SORT);
  const [keyword, setKeyword] = useState(DEFAULT_PARAMS.KEYWORD);

  return (
    <div className='flex w-full gap-10 px-40 py-10'>
      <Filter
        jobs={jobs}
        locations={locations}
        setServiceType={setServiceType}
        setServiceStatus={setServiceStatus}
        setJobs={setJobs}
        setLocations={setLocations}
        setEducationLevel={setEducationLevel}
        setExperienceLevel={setExperienceLevel}
      />
      <div className='flex flex-col flex-1'>
        <div className='sticky top-16 pb-4 bg-white'>
          <SearchBar setKeyword={setKeyword} />
        </div>
        <div className='flex justify-end sticky top-32 mb-2 bg-white'>
          <SortTypeSelect setSort={setSort} />
        </div>
        <div className='flex flex-1'>
          <RecruitmentList
            serviceType={serviceType}
            serviceStatus={serviceStatus}
            jobs={jobs}
            locations={locations}
            educationLevel={educationLevel}
            experienceLevel={experienceLevel}
            sort={sort}
            keyword={keyword}
          />
        </div>
      </div>
    </div>
  );
}
