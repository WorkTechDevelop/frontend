import { client } from "@/lib/rpc";
import { UserData } from "@/lib/types";

export const getCurrent = async (): Promise<UserData | null> => {
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
