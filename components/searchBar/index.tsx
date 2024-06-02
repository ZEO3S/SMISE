import { Dispatch, SetStateAction } from "react";

import Input from "../common/input";
import MagnifyingGlassSVG from "@/assets/svgs/magnifying_glass.svg";

import { Keyword } from "@/types/api/recruitment";

interface Props {
  setKeyword: Dispatch<SetStateAction<Keyword>>;
}

export default function SearchBar({ setKeyword }: Props) {
  const updateKeyword = (value: string) => setKeyword(value);

  return (
    <Input onEnter={updateKeyword} hasButton buttonImage={MagnifyingGlassSVG} />
  );
}
