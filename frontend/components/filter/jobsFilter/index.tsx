import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import CloseSVG from "@/assets/svgs/close.svg";
import ArrowSVG from "@/assets/svgs/arrow.svg";
import Text from "@/components/common/text";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal";
import Checkbox from "@/components/common/checkbox";

import { Job } from "@/types/api/recruitment";
import { useModal } from "@/hooks/useModal";
import { useSelectedCategory } from "@/hooks/useSelectedCategory";
import { useSelectedJobs } from "@/hooks/useSelectedJobs";
import { useCheckedDetails } from "@/hooks/useCheckedDetails";

const FETCHED_JOBS = [
  {
    category: "개발",
    details: ["프론트엔드", "백엔드", "데이터분석"],
  },
  {
    category: "디자인",
    details: ["시각디자인", "인테리어디자인", "캐릭터디자인"],
  },
];

interface Props {
  jobs: Array<Job> | null;
  setJobs: Dispatch<SetStateAction<Array<Job> | null>>;
}

export default function JobsFilter({ jobs, setJobs }: Props) {
  const { isOpen, openModal, closeModal } = useModal();
  const { selectedCategory, updateSelectedCategory, clearSelectedCategory } =
    useSelectedCategory();
  const {
    selectedJobs,
    addSelectedJobs,
    deleteSelectedJobs,
    clearSelectedJobs,
    initializeSelectedJobs,
  } = useSelectedJobs(jobs);
  const {
    checkedDetails,
    generateDetailKey,
    addCheckedDetail,
    deleteCheckedDetail,
    clearCheckedDetails,
    initializeCheckedDetails,
  } = useCheckedDetails(jobs);

  const citiesLength = jobs
    ? jobs.reduce((acc, cur) => {
        return acc + cur.details.length;
      }, 0)
    : 0;

  const handleClick전체 = () => {
    clearSelectedCategory();
  };

  const handleClickButton = (category: string) => {
    updateSelectedCategory(category);
  };

  const addDetail = (job: string, checkedJob: string) => {
    addCheckedDetail(checkedJob);
    addSelectedJobs(selectedCategory, job);
  };

  const deleteJob = (selectedCategory: string, job: string) => {
    const targetCheckedJob = generateDetailKey(selectedCategory, job);
    deleteCheckedDetail(targetCheckedJob);

    deleteSelectedJobs(selectedCategory, job);
  };

  const resetJob = () => {
    clearSelectedCategory();
    clearSelectedJobs();
    clearCheckedDetails();
  };

  const applyKob = () => {
    clearSelectedCategory();
    setJobs(selectedJobs);
    closeModal();
  };

  const onCloseModal = () => {
    clearSelectedCategory();
    initializeSelectedJobs();
    initializeCheckedDetails();
    closeModal();
  };

  return (
    <div className='py-2'>
      <div className='py-2'>
        <Text variant='semi-title' content='직무' />
      </div>
      <Button onClick={openModal}>
        <div className='flex gap-1 py-2 cursor-pointer'>
          <Text
            content={jobs && Boolean(jobs.length) ? jobs[0].category : "전체"}
          />
          {jobs && Boolean(jobs.length) && (
            <>
              <Text content='·' />
              <Text content={jobs[0].details[0]} />
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
              {FETCHED_JOBS.map(({ category }) => {
                return (
                  <li key={category}>
                    <Button
                      className='flex justify-between w-60 p-4 cursor-pointer rounded hover:bg-default-color hover:bg-opacity-10'
                      onClick={() => handleClickButton(category)}
                    >
                      <Text variant='full-base' content={category} />
                      <Image
                        className='ml-1 -rotate-90 select-none'
                        src={ArrowSVG}
                        alt='상세 직무 열기 버튼'
                      />
                    </Button>
                  </li>
                );
              })}
            </ul>
            {selectedCategory ? (
              <ul className='flex-1'>
                {FETCHED_JOBS.find(
                  (job) => job.category === selectedCategory
                )?.details.map((job) => {
                  const key = generateDetailKey(selectedCategory, job);

                  return (
                    <li key={key}>
                      <Checkbox
                        value={job}
                        label={job}
                        defaultChecked={checkedDetails?.includes(key)}
                        boxPosition='right'
                        textVariant='full-base'
                        onCheck={() => addDetail(job, key)}
                        onUnCheck={() => deleteJob(selectedCategory, job)}
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
                  content='원하는 직무를 선택하고 적용을 눌러 확인하세요'
                />
              </div>
            )}
          </div>
          <div className='flex justify-between'>
            <Button
              className='py-1 px-4 rounded border border-default-color border-opacity-30 hover:bg-default-color hover:bg-opacity-10'
              onClick={resetJob}
            >
              <Text variant='middle-title' opacity={70} content='초기화' />
            </Button>
            <Button
              className='bg-green-800 py-1 px-4 rounded'
              onClick={applyKob}
            >
              <Text variant='middle-title' color='white' content='적용' />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
