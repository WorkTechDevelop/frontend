import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { Task } from "../types";

export const useGetTasks = () => {
  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: async (): Promise<Task[]> => {
      try {
        const response = await client.getTasks();
        return response;
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        throw new Error("Failed to fetch tasks");
      }
    },
  });
  
  return query;
};
