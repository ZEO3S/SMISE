const headers = {
  "Content-Type": "application/json",
};

export const https = {
  get: (url: string) =>
    fetch(url, {
      headers,
    }),
};
