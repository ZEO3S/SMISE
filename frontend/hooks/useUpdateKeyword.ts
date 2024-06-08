import { Dispatch, SetStateAction } from "react";

import { Keyword } from "@/types/api/recruitment";

export const useUpdateKeyword = (
  setKeyword: Dispatch<SetStateAction<Keyword | null>>
) => {
  const updateKeyword = (value: string) => setKeyword(value);

  return { updateKeyword };
};