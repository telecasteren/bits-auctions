import { ApiError } from "@/services/api/shared/apiError";
import { authFetch } from "@/services/api/shared/authFetch";
import { BASE_URL } from "@/services/api/shared/endpoints";
import { unAuthenticatedEvents } from "@/app/events/auth/unauthenticated";

interface withApiHelperProps {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: string;
  noContent?: boolean;
}

interface ApiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export async function withApiHelper<T>(
  props: withApiHelperProps & { noContent?: false },
): Promise<ApiResponse<T>>;
export async function withApiHelper(
  props: withApiHelperProps & { noContent?: true },
): Promise<void>;
export async function withApiHelper<T>({
  endpoint,
  method = "GET",
  body,
  noContent = false,
}: withApiHelperProps): Promise<ApiResponse<T> | void> {
  const response = await authFetch(BASE_URL + endpoint, {
    method,
    body,
  });

  if (response.ok) {
    if (noContent || response.status === 204) return;

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("API did not return JSON");
    }

    return await response.json();
  }

  if (response.status === 401) {
    unAuthenticatedEvents();
    const error = await response.json().catch(() => null);
    throw new Error("Unauthorized request", { cause: error });
  }

  const errorBody = await response.text().catch(() => "");
  throw new ApiError(
    `Request failed (${response.status})`,
    response.status,
    errorBody,
  );
}
