import { Dispatch, SetStateAction } from "react";

import { ExperienceLevel } from "@/types/api/recruitment";
import {
  generateMaxText,
  generateMinText,
} from "@/constants/components/experienceLevel";

export const useUpdateExperienceLevel = (
  setExperienceLevel: Dispatch<SetStateAction<ExperienceLevel | null>>
) => {
  const updateExperienceLevel = (min: number, max: number) => {
    setExperienceLevel((prev) => {
      const newExperienceLevel = {
        start: generateMinText(min),
        end: generateMaxText(max),
      };

      const isExperienceLevel = (obj: unknown): obj is ExperienceLevel => {
        if (typeof obj !== "object" || obj === null) return false;

        if (!("start" in obj && "end" in obj)) return false;

        if (typeof obj.start !== "string" || typeof obj.end !== "string")
          return false;

        const reg = /^(\d+)년$/;

        return (
          (obj.start === "신입" || reg.test(obj.start)) && reg.test(obj.end)
        );
      };

      if (!isExperienceLevel(newExperienceLevel)) return prev;

      return newExperienceLevel;
    });
  };

  return updateExperienceLevel;
};
