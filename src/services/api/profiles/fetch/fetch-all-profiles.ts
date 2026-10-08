import { withApiHelper } from "@/services/api/shared/withApiHelper";
import { USERS } from "@/services/api/shared/endpoints";
import type { Profile } from "@/services/types/profile";

export const fetchAllProfiles = async () => {
  const { data } = await withApiHelper<Profile[]>({
    endpoint: `${USERS}`,
  });
  return data;
};
