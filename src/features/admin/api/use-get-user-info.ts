import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { UserDataDto } from "@/lib/types.api";

export const useGetUserInfo = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async (): Promise<UserDataDto> => {
      if (!userId) {
        throw new Error("User ID is required");
      }
      try {
        const response = await client.getUserById(userId);
        return response;
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        throw new Error("Failed to fetch user info");
      }
    },
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // 10 минут
  });
}; 