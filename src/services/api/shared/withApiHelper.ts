import {
  ApiError,
  parseErrorBody,
  getErrorMessage,
} from "@/services/api/shared/apiError";
import { authFetch } from "@/services/api/shared/authFetch";
import { BASE_URL } from "@/services/api/shared/endpoints";
import { isAuthenticated } from "@/utils/config/constants";

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
  let response: Response;
  try {
    response = await authFetch(BASE_URL + endpoint, {
      method,
      body,
    });
  } catch (cause) {
    throw new ApiError(`Network error: ${method} ${endpoint}`, 0, undefined, {
      cause,
    });
  }

  if (response.ok) {
    if (noContent || response.status === 204) return;

    try {
      return await response.json();
    } catch (cause) {
      throw new ApiError("Invalid JSON response", response.status, { cause });
    }
  }

  if (response.status === 401 && isAuthenticated()) {
    window.dispatchEvent(new CustomEvent("auth:unauthorized"));
  }

  const errorBody = await parseErrorBody(response);
  throw new ApiError(
    getErrorMessage(errorBody, response.status),
    response.status,
    errorBody,
  );
}
