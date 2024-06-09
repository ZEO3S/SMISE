import Link from "next/link";

import Badge from "../common/badge";
import Text from "../common/text";
import Spinner from "../common/spinner";

import { RequestRecruitmentParams } from "@/types/api/recruitment";
import { useRecruitment } from "@/hooks/useRecruitment";

export default function RecruitmentList({
  serviceType,
  serviceStatus,
  jobs,
  locations,
  educationLevel,
  experienceLevel,
  sort,
  keyword,
}: RequestRecruitmentParams) {
  const { recruitment, isLoading, error } = useRecruitment({
    serviceType,
    serviceStatus,
    jobs,
    locations,
    educationLevel,
    experienceLevel,
    sort,
    keyword,
  });

  if (isLoading)
    return (
      <div className='flex flex-1 justify-center items-center'>
        <Spinner />
      </div>
    );

  if (error) return <div>에러 발생!</div>;

  return (
    <ul>
      {recruitment.map(
        ({
          id,
          serviceType,
          experienceLevel,
          educationLevel,
          expirationDate,
          title,
          company,
          location,
          salary,
          href,
        }) => {
          return (
            <li
              key={id}
              className='border-default-color border-b border-opacity-10 last:border-b-0'
            >
              <Link
                className='flex flex-col gap-3 px-4 py-5 hover:bg-default-color hover:bg-opacity-10'
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                replace
              >
                <div className='flex justify-between items-center'>
                  <div className='flex gap-2'>
                    <Badge content={serviceType} />
                    <Badge content={experienceLevel} />
                    <Badge content={educationLevel} />
                  </div>
                  <Text content={expirationDate} />
                </div>
                <Text variant='middle-title' content={title} />
                <div className='flex gap-3'>
                  <Text content={company} />
                  <Text content={location} />
                  <Text content={salary} />
                </div>
              </Link>
            </li>
          );
        }
      )}
    </ul>
  );
}
