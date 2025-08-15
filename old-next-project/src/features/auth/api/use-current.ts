import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { UserDataDto } from "@/lib/types.api";

export const useCurrent = () => {
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async (): Promise<UserDataDto | null> => {
      try {
        const response = await client.getUserProfile();
        return response as UserDataDto;
      } catch (error) {
        console.error("Failed to get current user:", error);
        return null;
      }
    },
    retry: false,
    staleTime: 10 * 60 * 1000, // 10 минут
    refetchOnWindowFocus: false,
  });
  
  return query;
};
