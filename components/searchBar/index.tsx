import { Dispatch, SetStateAction } from "react";

import Input from "../common/input";
import MagnifyingGlassSVG from "@/assets/svgs/magnifying_glass.svg";

import { Keyword } from "@/types/api/recruitment";
import { useControlledInput } from "@/hooks/useControlledInput";
import { useUpdateKeyword } from "@/hooks/useUpdateKeyword";

interface Props {
  setKeyword: Dispatch<SetStateAction<Keyword>>;
}

export default function SearchBar({ setKeyword }: Props) {
  const { value, onChangeInput } = useControlledInput();
  const { updateKeyword } = useUpdateKeyword(setKeyword);

  return (
    <Input
      value={value}
      buttonImage={MagnifyingGlassSVG}
      placeholder='검색어를 입력해 주세요.'
      onChange={onChangeInput}
      onEnter={() => updateKeyword(value)}
      onClickButton={() => updateKeyword(value)}
      hasButton
    />
  );
}
