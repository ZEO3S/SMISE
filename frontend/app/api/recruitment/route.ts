import { PARAMS } from '@/constants/api/queryParams';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const serviceType = searchParams.get(PARAMS.SERVICE_TYPE);
  const serviceStatus = searchParams.get(PARAMS.SERVICE_STATUS);
  const jobs = searchParams.get(PARAMS.JOBS);
  const detailedJobs = searchParams.get('detailedJobs');
  const locations = searchParams.get(PARAMS.LOCATIONS);
  const experienceLevel = searchParams.get(PARAMS.EXPERIENCE_LEVEL);
  const educationLevel = searchParams.get(PARAMS.EDUCATION_LEVEL);
  const sort = searchParams.get(PARAMS.SORT);
  const size = Number(searchParams.get(PARAMS.SIZE));
  const page = Number(searchParams.get(PARAMS.PAGE));
  const keyword = searchParams.get(PARAMS.KEYWORD);

  console.log(
    serviceType,
    serviceStatus,
    jobs,
    detailedJobs,
    locations,
    experienceLevel,
    educationLevel,
    sort,
    size,
    page,
    keyword,
  );

  const RECRUITMENT = Array.from({ length: 40 }, (_, index) => {
    return {
      id: index,
      serviceType: '산업기능요원',
      experienceLevel: '경력무관',
      educationLevel: '대학졸업',
      expirationDate: '20240610',
      title: `머신러닝 엔지니어 채용-${index}`,
      company: '샌드버드',
      location: '경기도 성남시',
      salary: '8000~9000만원',
      href: 'https://www.google.com',
    };
  });

  const data = {
    recruitment: RECRUITMENT.slice(page * size, size * (page + 1)),
    page: page,
    totalPages: Math.ceil(RECRUITMENT.length / size),
  };

  return Response.json(data);
}
