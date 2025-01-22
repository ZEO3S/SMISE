export const EXPERIENCE_LEVEL_RANGE = {
  MIN: 0,
  MAX: 5,
};

export const generateExperienceLevelText = (experienceLevel: number) =>
  experienceLevel === EXPERIENCE_LEVEL_RANGE.MIN ? '신입' : `${experienceLevel}년`;
