import { Location } from '@/types/api/location';

import { PARAMS } from '@/constants/api/queryParams';

import Button from '@/components/common/button';
import Text from '@/components/common/text';

import { usePushRouteWithQueryParam } from '@/hooks/usePushRouteWithQueryParam';

interface Props {
  locations: Array<Location> | null;
  onCloseModal: () => void;
}

export default function ApplyButton({ locations, onCloseModal }: Props) {
  const { pushRoute, deleteQueryParam } = usePushRouteWithQueryParam();

  const applyLocation = () => {
    if (locations && locations.length) {
      const stringifiedLocation = locations
        .map((location) => `${location.district},${location.cities.map((city) => city.split('-').pop()).join(',')}`)
        .join('&');

      pushRoute(PARAMS.LOCATIONS, stringifiedLocation);
    } else {
      deleteQueryParam(PARAMS.LOCATIONS);
    }

    onCloseModal();
  };

  return (
    <Button className='bg-green-800 py-1 px-4 rounded' onClick={applyLocation}>
      <Text variant='middle-title' color='white' content='적용' />
    </Button>
  );
}
