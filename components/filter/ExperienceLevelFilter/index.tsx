import { Dispatch, SetStateAction, useState } from "react";

import Text from "@/components/common/text";
import Slider from "@/components/common/slider";

import { ExperienceLevel } from "@/types/api/recruitment";
import { useUpdateExperienceLevel } from "@/hooks/useUpdateExperienceLevel";
import {
  EXPERIENCE_LEVEL_RANGE,
  generateMaxText,
  generateMinText,
} from "@/constants/components/experienceLevel";

interface Props {
  setExperienceLevel: Dispatch<SetStateAction<ExperienceLevel | null>>;
}

export default function ExperienceLevelFilter({ setExperienceLevel }: Props) {
  const [minValue, setMinValue] = useState(EXPERIENCE_LEVEL_RANGE.MIN);
  const [maxValue, setMaxValue] = useState(EXPERIENCE_LEVEL_RANGE.MAX);
  const updateExperienceLevel = useUpdateExperienceLevel(setExperienceLevel);
  const isRenderMinText = minValue !== EXPERIENCE_LEVEL_RANGE.MAX;
  const isRenderTildeText = minValue !== maxValue;
  const isRenderMaxText =
    maxValue !== EXPERIENCE_LEVEL_RANGE.MIN &&
    !(maxValue !== EXPERIENCE_LEVEL_RANGE.MAX && maxValue === minValue);
  const isRenderOverText = maxValue === EXPERIENCE_LEVEL_RANGE.MAX;

  return (
    <div className='flex flex-col flex-1'>
      <Text variant='semi-title' content='경력' />
      <div className='flex gap-1'>
        {isRenderMinText && <Text content={generateMinText(minValue)} />}
        {isRenderTildeText && <Text content='~' />}
        {isRenderMaxText && <Text content={generateMaxText(maxValue)} />}
        {isRenderOverText && <Text content='이상' />}
      </div>
      <Slider
        minValue={minValue}
        maxValue={maxValue}
        min={EXPERIENCE_LEVEL_RANGE.MIN}
        max={EXPERIENCE_LEVEL_RANGE.MAX}
        step={1}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
        onChange={updateExperienceLevel}
      />
    </div>
  );
}
