"use client";

import { useState } from "react";

import Filter from "@/components/filter";
import SearchBar from "@/components/searchBar";
import SortTypeSelect from "@/components/sortTypeSelect";
import RecruitmentList from "@/components/recruitmentList";

import { DefaultRequestRecruitmentParams } from "@/types/api/recruitment";

const DEFAULT_PARAMS: DefaultRequestRecruitmentParams = {
  SERVICE_TYPES: null,
  SERVICE_STATUS: null,
  JOBS: null,
  DETAILED_JOBS: null,
  LOCATIONS: null,
  EXPERIENCE_LEVEL: null,
  EDUCATION_LEVEL: null,
  SORT: "최신순",
  LIMIT: null,
  CURSOR: null,
  KEYWORD: null,
};

export default function Home() {
  const [serviceTypes, setServiceTypes] = useState(
    DEFAULT_PARAMS.SERVICE_TYPES
  );
  const [serviceStatus, setServiceStatus] = useState(
    DEFAULT_PARAMS.SERVICE_STATUS
  );
  const [educationLevel, setEducationLevel] = useState(
    DEFAULT_PARAMS.EDUCATION_LEVEL
  );
  const [sort, setSort] = useState(DEFAULT_PARAMS.SORT);
  const [keyword, setKeyword] = useState(DEFAULT_PARAMS.KEYWORD);

  return (
    <div className='flex gap-6 flex-1'>
      <div className='w-80'>
        <Filter
          setServiceTypes={setServiceTypes}
          setServiceStatus={setServiceStatus}
          setEducationLevel={setEducationLevel}
        />
      </div>
      <div className='flex-1'>
        <div className='flex mb-6'>
          <SearchBar setKeyword={setKeyword} />
        </div>
        <div className='flex justify-end mb-2'>
          <SortTypeSelect setSort={setSort} />
        </div>
        <RecruitmentList
          serviceTypes={serviceTypes}
          serviceStatus={serviceStatus}
          jobs={null}
          detailedJobs={null}
          locations={null}
          experienceLevel={null}
          educationLevel={educationLevel}
          sort={sort}
          limit={null}
          cursor={null}
          keyword={keyword}
        />
      </div>
    </div>
  );
}
