import RecruitmentList from "@/components/recruitmentList";

export default function Home() {
  return (
    <div className='flex gap-6 flex-1'>
      <div className='w-80'>필터</div>
      <div className='flex-1'>
        <div>검색</div>
        <div>정렬</div>
        <RecruitmentList />
      </div>
    </div>
  );
}
