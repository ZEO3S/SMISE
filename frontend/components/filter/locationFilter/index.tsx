import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import CloseSVG from "@/assets/svgs/close.svg";
import ArrowSVG from "@/assets/svgs/arrow.svg";
import Text from "@/components/common/text";
import Modal from "@/components/common/modal";
import Button from "@/components/common/button";
import Checkbox from "@/components/common/checkbox";

import { District, Location } from "@/types/api/recruitment";
import { LOCATIONS } from "@/constants/components/location";
import { useModal } from "@/hooks/useModal";
import { useSelectedDistrict } from "@/hooks/useSelectedDistrict";
import { useSelectedLocations } from "@/hooks/useSelectedLocations";
import { useCheckedCities } from "@/hooks/useCheckedCities";

interface Props {
  locations: Array<Location> | null;
  setLocations: Dispatch<SetStateAction<Array<Location> | null>>;
}

export default function LocationFilter({ locations, setLocations }: Props) {
  const { isOpen, openModal, closeModal } = useModal();
  const {
    selectedDistrict,
    isDistrict,
    updateSelectedDistrict,
    clearSelectedDistrict,
  } = useSelectedDistrict();
  const {
    selectedLocations,
    addSelectedLocation,
    deleteSelectedLocation,
    clearSelectedLocation,
    initializeSelectedLocation,
  } = useSelectedLocations(locations);
  const {
    checkedCities,
    generateCityKey,
    addCheckedCity,
    deleteCheckedCity,
    clearCheckedCities,
    initializeCheckedCities,
  } = useCheckedCities(locations);

  const citiesLength = locations
    ? locations.reduce((acc, cur) => {
        return acc + cur.cities.length;
      }, 0)
    : 0;

  const handleClick전체 = () => {
    clearSelectedDistrict();
  };

  const handleClickButton = (district: string) => {
    if (!isDistrict(district)) return;

    updateSelectedDistrict(district);
  };

  const addCity = (city: string, checkedCity: string) => {
    addCheckedCity(checkedCity);
    addSelectedLocation(selectedDistrict, city);
  };

  const deleteCity = (selectedDistrict: District, city: string) => {
    const targetCheckedCity = generateCityKey(selectedDistrict, city);
    deleteCheckedCity(targetCheckedCity);

    deleteSelectedLocation(selectedDistrict, city);
  };

  const resetLocation = () => {
    clearSelectedDistrict();
    clearSelectedLocation();
    clearCheckedCities();
  };

  const applyLocation = () => {
    clearSelectedDistrict();
    setLocations(selectedLocations);
    closeModal();
  };

  const onCloseModal = () => {
    clearSelectedDistrict();
    initializeSelectedLocation();
    initializeCheckedCities();
    closeModal();
  };

  return (
    <div className='py-2'>
      <div className='py-2'>
        <Text variant='semi-title' content='지역' />
      </div>
      <Button onClick={openModal}>
        <div className='flex gap-1 py-2 cursor-pointer'>
          <Text
            content={
              locations && Boolean(locations.length)
                ? locations[0].district
                : "전체"
            }
          />
          {locations && Boolean(locations.length) && (
            <>
              <Text content='·' />
              <Text content={locations[0].cities[0]} />
              {Boolean(citiesLength - 1) && (
                <Text content={`외 ${citiesLength - 1}`} />
              )}
            </>
          )}
          <Image
            className='ml-1 -rotate-90 select-none border border-default-color rounded'
            src={ArrowSVG}
            alt='모달 열기 버튼'
          />
        </div>
      </Button>
      <Modal openState={isOpen} onClose={onCloseModal}>
        <div className='flex flex-col gap-6 w-[660px] p-6 rounded-lg bg-white'>
          <div className='flex justify-between'>
            <Text variant='title' content='지역' />
            <Button onClick={closeModal}>
              <Image
                className='select-none'
                src={CloseSVG}
                alt='모달 닫기 버튼'
              />
            </Button>
          </div>
          <div className='flex gap-2 h-[360px]'>
            <ul>
              <li key='전체'>
                <Button
                  className='flex justify-between w-60 p-4 cursor-pointer rounded hover:bg-default-color hover:bg-opacity-10'
                  onClick={handleClick전체}
                >
                  <Text variant='full-base' content='전체' />
                </Button>
              </li>
              {Object.keys(LOCATIONS).map((location) => {
                return (
                  <li key={location}>
                    <Button
                      className='flex justify-between w-60 p-4 cursor-pointer rounded hover:bg-default-color hover:bg-opacity-10'
                      onClick={() => handleClickButton(location)}
                    >
                      <Text variant='full-base' content={location} />
                      <Image
                        className='ml-1 -rotate-90 select-none'
                        src={ArrowSVG}
                        alt='상세 행정구역 열기 버튼'
                      />
                    </Button>
                  </li>
                );
              })}
            </ul>
            {selectedDistrict ? (
              <ul className='flex-1'>
                {LOCATIONS[selectedDistrict].map((city) => {
                  const key = generateCityKey(selectedDistrict, city);

                  return (
                    <li key={key}>
                      <Checkbox
                        value={city}
                        label={city}
                        defaultChecked={checkedCities?.includes(key)}
                        boxPosition='right'
                        textVariant='full-base'
                        onCheck={() => addCity(city, key)}
                        onUnCheck={() => deleteCity(selectedDistrict, city)}
                        padding
                        hover
                        rounded
                      />
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className='flex flex-col justify-center items-center flex-1'>
                <Text
                  variant='full-base'
                  opacity={70}
                  content='원하는 지역을 선택하고 적용을 눌러 확인하세요'
                />
              </div>
            )}
          </div>
          <div className='flex justify-between'>
            <Button
              className='py-1 px-4 rounded border border-default-color border-opacity-30 hover:bg-default-color hover:bg-opacity-10'
              onClick={resetLocation}
            >
              <Text variant='middle-title' opacity={70} content='초기화' />
            </Button>
            <Button
              className='bg-green-800 py-1 px-4 rounded'
              onClick={applyLocation}
            >
              <Text variant='middle-title' color='white' content='적용' />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
