import { createContext } from 'react';

import { SelectOption } from '@/types/component/select';

export interface SelectContextValue extends SelectOption {
  onSelect: (option: SelectOption) => void;
}

export const SelectContext = createContext<SelectContextValue | null>(null);
