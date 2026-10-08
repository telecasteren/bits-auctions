import { USERS } from "@/services/api/shared/endpoints";
import { withApiHelper } from "@/services/api/shared/withApiHelper";
import { Profile } from "@/services/types/profile";

export const fetchSingleProfile = async (username: string) => {
  const { data } = await withApiHelper<Profile>({
    endpoint: `${USERS}/${username}?_listings=true&_wins=true`,
  });
  return data;
};
