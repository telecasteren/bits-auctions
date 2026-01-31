export type ApiError = {
  message: string;
  code?: string;
  path?: (string | number)[];
};

export type ApiErrorResponse = {
  status?: string;
  statusCode?: number;
  errors?: ApiError[];
  message?: string;
};
