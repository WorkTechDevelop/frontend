import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { UserShortDataDto } from "@/lib/types.api";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<UserShortDataDto[]> => {
      try {
        const response = await client.getAllUsers();
        return response;
      } catch (error) {
        console.error("Failed to fetch users:", error);
        throw new Error("Failed to fetch users");
      }
    },
    staleTime: 10 * 60 * 1000, // 10 минут
  });
}; 