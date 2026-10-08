/** Error thrown for failed API calls. Carries the HTTP status and optional raw details. */
export class ApiError extends Error {
  readonly status: number;
  readonly details?: unknown;

  constructor(
    message: string,
    status: number,
    details?: unknown,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export type ApiErrorDetail = {
  message: string;
  code?: string;
  path?: string | number[];
};
export type ApiErrorResponse = {
  status?: string;
  statusCode?: number;
  errors?: ApiErrorDetail[];
  message?: string;
};

export async function parseErrorBody(
  response: Response,
): Promise<ApiErrorResponse | string> {
  const text = await response.text().catch(() => "");
  try {
    return JSON.parse(text) as ApiErrorResponse;
  } catch {
    return text;
  }
}

export function getErrorMessage(
  body: ApiErrorResponse | string,
  status: number,
): string {
  if (typeof body === "object") {
    return (
      body.errors?.[0]?.message ?? body.message ?? `Request failed (${status})`
    );
  }
  return `Request failed (${status})`;
}
