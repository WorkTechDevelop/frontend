import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { TaskModelDTO } from "@/lib/types.api";
import { Task } from "../types";
import { toast } from "sonner";

type RequestType = TaskModelDTO;
type ResponseType = Task;

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json: RequestType) => {
      const response = await client.createTask(json);
      return response;
    },
    onSuccess: () => {
      toast.success("Задача создана успешно");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Ошибка создания задачи");
    },
  });

  return mutation;
};
