import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { ShortProjectDataDto } from "@/lib/types.api";

export const useGetProjects = () => {
  const query = useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<ShortProjectDataDto[]> => {
      try {
        const response = await client.getAllUserProjects();
        return response;
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        throw new Error("Failed to fetch projects");
      }
    },
    staleTime: 10 * 60 * 1000, // 10 минут
  });
  
  return query;
};
