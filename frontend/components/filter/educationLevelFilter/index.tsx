import { useState } from "react";

import Select from "@/components/common/select";
import Text from "@/components/common/text";

import { EDUCATION_LEVELS } from "@/constants/components/educationLevel";
import { SelectOption } from "@/types/components/select";

interface Props {
  updateEducationLevel: (educationLevel: SelectOption) => void;
}

export default function EducationLevelFilter({ updateEducationLevel }: Props) {
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(
    EDUCATION_LEVELS[0]
  );

  return (
    <div className='pt-2 pb-4'>
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
                  onSelect={() => {
                    updateEducationLevel(educationLevel);
                    setSelectedEducationLevel(educationLevel);
                  }}
                />
              </li>
            );
          })}
        </ul>
      </Select>
    </div>
  );
}
