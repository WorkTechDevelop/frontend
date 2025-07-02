import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { UserData } from "@/lib/types";

export const useCurrent = () => {
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async (): Promise<UserData | null> => {
      try {
        const response = await client.getCurrentUser();
        return response as UserData;
      } catch (error) {
        console.error("Failed to get current user:", error);
        return null;
      }
    },
    retry: false,
  });
  
  return query;
};
