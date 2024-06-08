import { Dispatch, SetStateAction, useState } from "react";

import { EDUCATION_LEVELS } from "@/constants/components/educationLevel";
import { EducationLevel } from "@/types/api/recruitment";
import { SelectOption } from "@/types/components/select";

export const useUpdateEducationLevel = (
  setEductionLevel: Dispatch<SetStateAction<EducationLevel | null>>
) => {
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(
    EDUCATION_LEVELS[0]
  );

  const updateEducationLevel = (educationLevel: SelectOption) => {
    setEductionLevel(educationLevel.value);
    setSelectedEducationLevel(educationLevel);
  };

  return { selectedEducationLevel, updateEducationLevel };
};
