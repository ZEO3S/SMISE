"use client";

import { useState } from "react";

import RecruitmentList from "@/components/recruitmentList";
import SortTypeSelect from "@/components/sortTypeSelect";

import { DefaultRequestRecruitmentParams, Sort } from "@/types/api/recruitment";

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
  const [sort, setSort] = useState<Sort>(DEFAULT_PARAMS.SORT);

  return (
    <div className='flex gap-6 flex-1'>
      <div className='w-80'>필터</div>
      <div className='flex-1'>
        <div className='mb-6'>검색</div>
        <div className='flex justify-end mb-2'>
          <SortTypeSelect setSort={setSort} />
        </div>
        <RecruitmentList
          serviceTypes={null}
          serviceStatus={null}
          jobs={null}
          detailedJobs={null}
          locations={null}
          experienceLevel={null}
          educationLevel={null}
          sort={sort}
          limit={null}
          cursor={null}
          keyword={null}
        />
      </div>
    </div>
  );
}
