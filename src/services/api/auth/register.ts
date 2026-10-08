import { withApiHelper } from "@/services/api/shared/withApiHelper";
import { AUTH, REGISTER } from "@/services/api/shared/endpoints";
import { Profile } from "@/services/types/profile";

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    return await withApiHelper<Profile>({
      endpoint: `${AUTH}${REGISTER}`,
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  } catch (error) {
    throw new Error("Registering account failed.", { cause: error });
  }
};
