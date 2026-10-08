import { headers } from "@/services/api/shared/headers";

export const authFetch = (url: string, options: RequestInit = {}) => {
  return fetch(url, {
    ...options,
    headers: headers(Boolean(options.body)),
  });
};
