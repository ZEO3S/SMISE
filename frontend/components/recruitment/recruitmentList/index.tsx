import Link from 'next/link';

import { generateExpirationText } from '@/utils/expiration';

import { Recruitment } from '@/types/api/recruitment';

import Badge from '../../common/badge';
import Text from '../../common/text';

interface Props {
  recruitment: Recruitment[] | null;
}

export default function RecruitmentList({ recruitment }: Props) {
  return (
    <ul className='flex-1'>
      {recruitment?.map(
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
            <li key={id} className='border-default-color border-b border-opacity-10 last:border-b-0'>
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
                  <Text content={generateExpirationText(expirationDate)} />
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
        },
      )}
    </ul>
  );
}
