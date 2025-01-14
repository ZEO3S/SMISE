export const EXPERIENCE_LEVEL_RANGE = {
  MIN: 0,
  MAX: 5,
};

export const generateMinText = (min: number) => (min === EXPERIENCE_LEVEL_RANGE.MIN ? '신입' : `${min}년`);

export const generateMaxText = (max: number) => `${max}년`;
