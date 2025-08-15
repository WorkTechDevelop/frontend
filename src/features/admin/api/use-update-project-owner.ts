import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UpdateProjectOwnerParams {
  projectId: string;
  userId: string;
}

export const useUpdateProjectOwner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, userId }: UpdateProjectOwnerParams) => {
      await client.updateProjectOwner(projectId, userId);
    },
    onSuccess: (_, variables) => {
      // Инвалидируем кэш проекта
      queryClient.invalidateQueries({ queryKey: ["project", variables.projectId] });
      // Инвалидируем кэш списка проектов
      queryClient.invalidateQueries({ queryKey: ["admin-projects-list"] });
      // Инвалидируем кэш пользователя, так как у него изменились права
      queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
    },
  });
}; 