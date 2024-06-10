const parseDate = (dateString: string) => {
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);

  return `${year}년 ${month}월 ${day}일`;
};

export const generateExpirationText = (expirationString: string) => {
  const datePattern = /^\d{8}$/;

  if (!datePattern.test(expirationString)) return expirationString;

  return `~ ${parseDate(expirationString)}`;
};
