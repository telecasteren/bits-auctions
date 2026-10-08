import { saveKey } from "@/utils/storage/storage";
import { withApiHelper } from "@/services/api/shared/withApiHelper";
import { AUTH, LOGIN } from "@/services/api/shared/endpoints";
import type { Profile } from "@/services/types/profile";

export const login = async (email: string, password: string) => {
  const { data } = await withApiHelper<Profile & { accessToken: string }>({
    endpoint: `${AUTH}${LOGIN}`,
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const { accessToken, ...profile } = data;
  saveKey("token", accessToken);
  saveKey("user", profile);

  return profile;
};
