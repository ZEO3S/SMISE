import { ResponseRecruitment } from "@/types/api/recruitment";

const RECRUITMENT: ResponseRecruitment = {
  recruitment: [
    {
      id: 1,
      serviceType: "산업기능요원",
      experienceLevel: "경력무관",
      educationLevel: "대학졸업",
      expirationDate: "채용시 마감",
      title: "머신러닝 엔지니어 채용",
      company: "샌드버드",
      location: "경기도 성남시",
      salary: "8000~9000만원",
      href: "https://www.google.com",
    },
    {
      id: 2,
      serviceType: "산업기능요원",
      experienceLevel: "경력무관",
      educationLevel: "대학졸업",
      expirationDate: "채용시 마감",
      title: "머신러닝 엔지니어 채용",
      company: "샌드버드",
      location: "경기도 성남시",
      salary: "8000~9000만원",
      href: "https://www.google.com",
    },
    {
      id: 3,
      serviceType: "산업기능요원",
      experienceLevel: "경력무관",
      educationLevel: "대학졸업",
      expirationDate: "채용시 마감",
      title: "머신러닝 엔지니어 채용",
      company: "샌드버드",
      location: "경기도 성남시",
      salary: "8000~9000만원",
      href: "https://www.google.com",
    },
    {
      id: 4,
      serviceType: "산업기능요원",
      experienceLevel: "경력무관",
      educationLevel: "대학졸업",
      expirationDate: "채용시 마감",
      title: "머신러닝 엔지니어 채용",
      company: "샌드버드",
      location: "경기도 성남시",
      salary: "8000~9000만원",
      href: "https://www.google.com",
    },
    {
      id: 5,
      serviceType: "산업기능요원",
      experienceLevel: "경력무관",
      educationLevel: "대학졸업",
      expirationDate: "채용시 마감",
      title: "머신러닝 엔지니어 채용",
      company: "샌드버드",
      location: "경기도 성남시",
      salary: "8000~9000만원",
      href: "https://www.google.com",
    },
    {
      id: 6,
      serviceType: "산업기능요원",
      experienceLevel: "경력무관",
      educationLevel: "대학졸업",
      expirationDate: "채용시 마감",
      title: "머신러닝 엔지니어 채용",
      company: "샌드버드",
      location: "경기도 성남시",
      salary: "8000~9000만원",
      href: "https://www.google.com",
    },
    {
      id: 7,
      serviceType: "산업기능요원",
      experienceLevel: "경력무관",
      educationLevel: "대학졸업",
      expirationDate: "채용시 마감",
      title: "머신러닝 엔지니어 채용",
      company: "샌드버드",
      location: "경기도 성남시",
      salary: "8000~9000만원",
      href: "https://www.google.com",
    },
    {
      id: 8,
      serviceType: "산업기능요원",
      experienceLevel: "경력무관",
      educationLevel: "대학졸업",
      expirationDate: "채용시 마감",
      title: "머신러닝 엔지니어 채용",
      company: "샌드버드",
      location: "경기도 성남시",
      salary: "8000~9000만원",
      href: "https://www.google.com",
    },
    {
      id: 9,
      serviceType: "산업기능요원",
      experienceLevel: "경력무관",
      educationLevel: "대학졸업",
      expirationDate: "채용시 마감",
      title: "머신러닝 엔지니어 채용",
      company: "샌드버드",
      location: "경기도 성남시",
      salary: "8000~9000만원",
      href: "https://www.google.com",
    },
    {
      id: 10,
      serviceType: "산업기능요원",
      experienceLevel: "경력무관",
      educationLevel: "대학졸업",
      expirationDate: "채용시 마감",
      title: "머신러닝 엔지니어 채용",
      company: "샌드버드",
      location: "경기도 성남시",
      salary: "8000~9000만원",
      href: "https://www.google.com",
    },
  ],
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const serviceType = searchParams.get("service_type");
  const serviceStatus = searchParams.get("serviceStatus");
  const jobs = searchParams.get("jobs");
  const detailedJobs = searchParams.get("detailedJobs");
  const locations = searchParams.get("locations");
  const experienceLevel = searchParams.get("experienceLevel");
  const educationLevel = searchParams.get("educationLevel");
  const sort = searchParams.get("sort");
  const limit = searchParams.get("limit");
  const cursor = searchParams.get("cursor");
  const keyword = searchParams.get("keyword");

  console.log(
    serviceType,
    serviceStatus,
    jobs,
    detailedJobs,
    locations,
    experienceLevel,
    educationLevel,
    sort,
    limit,
    cursor,
    keyword
  );

  return Response.json(RECRUITMENT);
}
