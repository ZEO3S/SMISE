import Input from "../common/input";
import MagnifyingGlassSVG from "@/assets/svgs/magnifying_glass.svg";

import { useControlledInput } from "@/hooks/useControlledInput";

interface Props {
  updateKeyword: (keyword: string) => void;
}

export default function SearchBar({ updateKeyword }: Props) {
  const { value, onChangeInput } = useControlledInput();

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
