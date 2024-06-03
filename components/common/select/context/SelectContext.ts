import { createContext } from "react";

import { SelectOption } from "@/types/components/select";

export type SelectContextValue = SelectOption;

export const SelectContext = createContext<SelectContextValue | null>(null);
