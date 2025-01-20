import { useState } from 'react';

import { Job } from '@/types/api/jobs';

export const useCheckedDetails = (jobs: Array<Job> | null) => {
  const defaultCheckedDetails = jobs
    ? jobs.flatMap((job) => {
        return job.details.map((detail) => {
          return `${job.category}-${detail}`;
        });
      })
    : null;
  const [checkedDetails, setCheckedDetails] = useState<Array<string> | null>(defaultCheckedDetails);

  const generateDetailKey = (category: string, detail: string) => {
    return `${category}-${detail}`;
  };

  const addCheckedDetail = (checkedDetail: string) => {
    setCheckedDetails((prev) => (prev ? [...prev, checkedDetail] : [checkedDetail]));
  };

  const deleteCheckedDetail = (checkedDetail: string) => {
    setCheckedDetails((prev) => {
      const newCheckedDetails = prev?.filter((key) => key !== checkedDetail);

      if (!prev || !newCheckedDetails || !newCheckedDetails.length) return null;

      return newCheckedDetails;
    });
  };

  const clearCheckedDetails = () => {
    setCheckedDetails(null);
  };

  const initializeCheckedDetails = () => {
    setCheckedDetails(defaultCheckedDetails);
  };

  return {
    checkedDetails,
    generateDetailKey,
    addCheckedDetail,
    deleteCheckedDetail,
    clearCheckedDetails,
    initializeCheckedDetails,
  };
};
