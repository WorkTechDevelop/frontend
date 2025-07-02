import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { Project } from "@/lib/types";

interface UseGetProjectProps {
  projectId: string;
}

export const useGetProject = ({ projectId }: UseGetProjectProps) => {
  const query = useQuery({
    queryKey: ["project", projectId],
    queryFn: async (): Promise<Project> => {
      if (!projectId) {
        throw new Error("Project ID is required");
      }
      
      try {
        const response = await client.getProject(projectId);
        return response;
      } catch (error) {
        console.error("Failed to fetch project:", error);
        throw new Error("Failed to fetch project");
      }
    },
    enabled: !!projectId,
  });
  
  return query;
};
