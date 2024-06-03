import { createContext } from "react";

import { SelectOption } from "@/types/components/select";

export const SelectContext = createContext<SelectOption | null>(null);
