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
    <div className='flex gap-10 flex-1'>
      <div className='w-80'>
        <Filter
          locations={locations}
          setServiceType={setServiceType}
          setServiceStatus={setServiceStatus}
          setLocations={setLocations}
          setEducationLevel={setEducationLevel}
          setExperienceLevel={setExperienceLevel}
        />
      </div>
      <div className='flex flex-col flex-1'>
        <div className='mb-6'>
          <SearchBar setKeyword={setKeyword} />
        </div>
        <div className='flex justify-end mb-2'>
          <SortTypeSelect setSort={setSort} />
        </div>
        <div className='flex-1 overflow-y-scroll'>
          <RecruitmentList
            serviceType={serviceType}
            serviceStatus={serviceStatus}
            jobs={null}
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
