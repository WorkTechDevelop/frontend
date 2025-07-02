import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { ShortProjectData } from "@/lib/types";

export const useGetProjects = () => {
  const query = useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<ShortProjectData[]> => {
      try {
        const response = await client.getProjects();
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
