import Modal from '@/components/common/modal';
import Text from '@/components/common/text';
import ApplyButton from '@/components/filter/locationFilter/applyButton';
import CitiesCheckbox from '@/components/filter/locationFilter/citiesCheckbox';
import DistrictSelect from '@/components/filter/locationFilter/districtSelect';
import ModalHeader from '@/components/filter/locationFilter/modalHeader';
import ModalOpenButton from '@/components/filter/locationFilter/modalOpenButton';
import ResetButton from '@/components/filter/locationFilter/resetButton';

import { useFilterLocations } from '@/hooks/useFilterLocations';
import { useLocations } from '@/hooks/useLocations';
import { useModal } from '@/hooks/useModal';

export default function LocationFilter() {
  const locations = useLocations();
  const {
    selectedDistrict,
    citiesWithSelectedDistrict,
    selectedLocations,
    updateDistrict,
    clearSelectedDistrict,
    addCity,
    deleteCity,
    clearFilterLocations,
  } = useFilterLocations(locations);
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className='py-2'>
      <div className='py-2'>
        <Text variant='semi-title' content='지역' />
      </div>
      <ModalOpenButton locations={locations} openModal={openModal} />
      <Modal openState={isOpen} onClose={closeModal}>
        <div className='flex flex-col gap-6 w-[660px] p-6 rounded-lg bg-white'>
          <ModalHeader closeModal={closeModal} />
          <div className='flex gap-2 h-[360px]'>
            <DistrictSelect clearSelectedDistrict={clearSelectedDistrict} updateDistrict={updateDistrict} />
            {selectedDistrict ? (
              <CitiesCheckbox
                cities={citiesWithSelectedDistrict}
                district={selectedDistrict}
                addCity={addCity}
                deleteCity={deleteCity}
              />
            ) : (
              <div className='flex flex-col justify-center items-center flex-1'>
                <Text variant='full-base' opacity={70} content='원하는 지역을 선택하고 적용을 눌러 확인하세요' />
              </div>
            )}
          </div>
          <div className='flex justify-between'>
            <ResetButton clearFilterLocations={clearFilterLocations} />
            <ApplyButton locations={selectedLocations} onCloseModal={closeModal} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
