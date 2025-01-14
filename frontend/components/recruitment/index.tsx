import { Recruitment as RecruitmentType } from '@/types/api/recruitment';

import Button from '../common/button';
import Spinner from '../common/spinner';
import Text from '../common/text';
import RecruitmentList from './recruitmentList';

interface Props {
  recruitment: Array<RecruitmentType>;
  isLoading: boolean;
  error: Error | null;
  hasNext: Boolean;
  fetchNextPage: () => void;
}

export default function Recruitment({ recruitment, isLoading, error, hasNext, fetchNextPage }: Props) {
  if (isLoading) {
    return (
      <div className='flex flex-1 justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className='flex flex-1 justify-center items-center'>에러가 발생했습니다. 새로고침을 해주세요</div>;
  }

  if (recruitment && !recruitment.length) {
    return <div className='flex flex-1 justify-center items-center'>채용 공고가 없어요</div>;
  }

  return (
    <div className='flex flex-col flex-1 gap-4'>
      <RecruitmentList recruitment={recruitment} />
      {hasNext && (
        <>
          <Button className='px-4 py-4 bg-green-800' onClick={fetchNextPage}>
            <Text variant='full-base' color='white' content='채용 공고 더 불러오기' />
          </Button>
        </>
      )}
    </div>
  );
}
