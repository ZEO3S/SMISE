import { useState } from "react";

import { Job } from "@/types/api/recruitment";

export const useSelectedJobs = (jobs: Array<Job> | null) => {
  const [selectedJobs, setSelectedJobs] = useState<Array<Job> | null>(jobs);

  const addSelectedJobs = (selectedCategory: string | null, detail: string) => {
    setSelectedJobs((prev) => {
      if (!selectedCategory) return prev;

      if (!prev) {
        return [
          {
            category: selectedCategory,
            details: [detail],
          },
        ];
      }

      const targetIndex = prev.findIndex(
        (prevJob) => prevJob.category === selectedCategory
      );

      if (targetIndex === -1) {
        return [
          ...prev,
          {
            category: selectedCategory,
            details: [detail],
          },
        ];
      }

      return prev.map((prevJob, index) => {
        if (index !== targetIndex) return prevJob;

        return {
          ...prevJob,
          details: [...prevJob.details, detail],
        };
      });
    });
  };

  const deleteSelectedJobs = (
    selectedCategory: string | null,
    detail: string
  ) => {
    setSelectedJobs((prev) => {
      if (!selectedCategory || !prev) return prev;

      const targetIndex = prev.findIndex(
        (prevJob) => prevJob.category === selectedCategory
      );

      if (targetIndex === -1) return prev;

      const newDetails = prev[targetIndex].details.filter(
        (prevDetail) => prevDetail !== detail
      );

      if (newDetails.length === 0) {
        return prev.filter((_, index) => index !== targetIndex);
      }

      return prev.map((prevJob, index) => {
        if (index !== targetIndex) return prevJob;

        return {
          ...prevJob,
          details: newDetails,
        };
      });
    });
  };

  const clearSelectedJobs = () => {
    setSelectedJobs(null);
  };

  const initializeSelectedJobs = () => setSelectedJobs(jobs);

  return {
    selectedJobs,
    addSelectedJobs,
    deleteSelectedJobs,
    clearSelectedJobs,
    initializeSelectedJobs,
  };
};
