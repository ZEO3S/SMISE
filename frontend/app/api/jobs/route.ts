import { ResponseJobs } from "@/types/api/jobs";

const RECRUITMENT: ResponseJobs = {
  jobs: [
    {
      category: "개발",
      details: ["프론트엔드", "백엔드", "데이터분석"],
    },
    {
      category: "디자인",
      details: ["시각디자인", "인테리어디자인", "캐릭터디자인"],
    },
  ],
};

export async function GET() {
  return Response.json(RECRUITMENT);
}
