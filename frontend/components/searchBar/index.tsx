import MagnifyingGlassSVG from '@/assets/svgs/magnifying_glass.svg';

import { PARAMS } from '@/constants/api/queryParams';

import Input from '@/components/common/input';

import { useControlledInput } from '@/hooks/useControlledInput';
import { usePushRouteWithQueryParam } from '@/hooks/usePushRouteWithQueryParam';

export default function SearchBar() {
  const { value, onChangeInput } = useControlledInput();
  const { pushRoute } = usePushRouteWithQueryParam();

  const updateKeyword = () => pushRoute(PARAMS.KEYWORD, value);

  return (
    <Input
      value={value}
      buttonImage={MagnifyingGlassSVG}
      placeholder='검색어를 입력해 주세요.'
      onChange={onChangeInput}
      onEnter={updateKeyword}
      onClickButton={updateKeyword}
      hasButton
    />
  );
}
