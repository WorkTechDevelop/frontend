import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { ProjectRequest, Project } from "@/lib/types";
import { toast } from "sonner";

type RequestType = ProjectRequest;
type ResponseType = Project;

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json: RequestType) => {
      const response = await client.createProject(json);
      return response;
    },
    onSuccess: () => {
      toast.success("Проект создан успешно");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Ошибка создания проекта");
    },
  });

  return mutation;
};
