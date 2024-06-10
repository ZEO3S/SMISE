import { useState } from "react";

import Text from "@/components/common/text";
import Slider from "@/components/common/slider";
import {
  EXPERIENCE_LEVEL_RANGE,
  generateMaxText,
  generateMinText,
} from "@/constants/components/experienceLevel";

interface Props {
  updateExperienceLevel: (min: number, max: number) => void;
}

export default function ExperienceLevelFilter({
  updateExperienceLevel,
}: Props) {
  const [minValue, setMinValue] = useState(EXPERIENCE_LEVEL_RANGE.MIN);
  const [maxValue, setMaxValue] = useState(EXPERIENCE_LEVEL_RANGE.MAX);
  const isRenderMinText = minValue !== EXPERIENCE_LEVEL_RANGE.MAX;
  const isRenderTildeText = minValue !== maxValue;
  const isRenderMaxText =
    maxValue !== EXPERIENCE_LEVEL_RANGE.MIN &&
    !(maxValue !== EXPERIENCE_LEVEL_RANGE.MAX && maxValue === minValue);
  const isRenderOverText = maxValue === EXPERIENCE_LEVEL_RANGE.MAX;

  return (
    <div className='flex flex-col py-2'>
      <div className='py-2'>
        <Text variant='semi-title' content='경력' />
      </div>
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
