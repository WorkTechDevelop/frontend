import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { UpdateTaskModelDTO } from "@/lib/types.api";
import { Task } from "../types";
import { toast } from "sonner";
import { mapTaskDataDtoToTask } from "./utils";

type RequestType = UpdateTaskModelDTO;
type ResponseType = Task;

export const useUpdateTask = (projectId: string, taskId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json: RequestType) => {
      const response = await client.updateTask(projectId, taskId, json);
      return mapTaskDataDtoToTask(response);
    },
    onSuccess: () => {
      toast.success("Задача обновлена успешно");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Ошибка обновления задачи");
    },
  });

  return mutation;
};
