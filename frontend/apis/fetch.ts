const headers = {
  'Content-Type': 'application/json',
};

export const https = {
  get: async <Response>(endpoint: string): Promise<Response> => {
    const response = await fetch(endpoint, {
      headers,
    });

    return await response.json();
  },
};
