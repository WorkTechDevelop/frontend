import { client } from "@/lib/rpc";
import { UserDataDto } from "@/lib/types.api";

export const getCurrent = async (): Promise<UserDataDto | null> => {
  try {
    if (typeof window === 'undefined') {
      return null;
    }
    
    const user = await client.getCurrentUser();
    return user;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
};
