import { ComponentPropsWithoutRef } from 'react';

export type Variant = 'title' | 'middle-title' | 'semi-title' | 'full-base' | 'base' | 'semi-base';

type Color = 'default-color' | 'white';

interface Props extends ComponentPropsWithoutRef<'p'> {
  content: string;
  variant?: Variant;
  color?: Color;
  opacity?: number;
}

const OPACITY = {
  'full-base': '',
  base: '',
  'semi-base': 'text-opacity-70',
  title: '',
  'middle-title': '',
  'semi-title': '',
};

const WEIGHT = {
  'full-base': 'font-medium',
  base: 'font-medium',
  'semi-base': 'font-medium',
  title: 'font-black',
  'middle-title': 'font-bold',
  'semi-title': 'font-semibold',
};

const SIZE = {
  'full-base': 'text-lg',
  base: 'text-sm',
  'semi-base': 'text-sm',
  title: 'text-2xl',
  'middle-title': 'text-xl',
  'semi-title': 'text-base',
};

export default function Text({ variant = 'base', color = 'default-color', opacity = 100, content }: Props) {
  return (
    <p
      className={`text-default-color select-none ${SIZE[variant]} ${WEIGHT[variant]} ${OPACITY[variant]} text-opacity-${opacity}`}
      style={{
        color,
      }}
    >
      {content}
    </p>
  );
}
