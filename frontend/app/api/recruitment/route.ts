export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const serviceType = searchParams.get("serviceType");
  const serviceStatus = searchParams.get("serviceStatus");
  const jobs = searchParams.get("jobs");
  const detailedJobs = searchParams.get("detailedJobs");
  const locations = searchParams.get("locations");
  const experienceLevel = searchParams.get("experienceLevel");
  const educationLevel = searchParams.get("educationLevel");
  const sort = searchParams.get("sort");
  const size = Number(searchParams.get("size"));
  const page = Number(searchParams.get("page"));
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
    size,
    page,
    keyword
  );

  const RECRUITMENT = Array.from({ length: 40 }, (_, index) => {
    return {
      id: index,
      serviceType: "산업기능요원",
      experienceLevel: "경력무관",
      educationLevel: "대학졸업",
      expirationDate: "20240610",
      title: `머신러닝 엔지니어 채용-${index}`,
      company: "샌드버드",
      location: "경기도 성남시",
      salary: "8000~9000만원",
      href: "https://www.google.com",
    };
  });

  const data = {
    recruitment: RECRUITMENT.slice(page * size, size * (page + 1)),
    page: page,
    totalPages: Math.ceil(RECRUITMENT.length / size),
  };

  return Response.json(data);
}
