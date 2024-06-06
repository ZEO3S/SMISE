import { Dispatch, SetStateAction } from "react";

import Select from "@/components/common/select";
import Text from "@/components/common/text";
import { EducationLevel } from "@/types/api/recruitment";
import { useUpdateEducationLevel } from "@/hooks/useUpdateEducationLevel";
import { EDUCATION_LEVELS } from "@/constants/components/educationLevel";

interface Props {
  setEducationLevel: Dispatch<SetStateAction<EducationLevel | null>>;
}

export default function EducationLevelFilter({ setEducationLevel }: Props) {
  const { selectedEducationLevel, updateEducationLevel } =
    useUpdateEducationLevel(setEducationLevel);

  return (
    <div className='flex-1 pt-2 pb-4'>
      <div className='py-2'>
        <Text variant='semi-title' content='학력' />
      </div>
      <Select selectedOption={selectedEducationLevel}>
        <ul>
          {EDUCATION_LEVELS.map((educationLevel) => {
            return (
              <li key={educationLevel.value}>
                <Select.Option
                  value={educationLevel.value}
                  label={educationLevel.label}
                  onSelect={() => updateEducationLevel(educationLevel)}
                />
              </li>
            );
          })}
        </ul>
      </Select>
    </div>
  );
}
