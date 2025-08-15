import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface ExtendedPermissionParams {
  projectId: string;
  userId: string;
}

export const useManageExtendedPermissions = () => {
  const queryClient = useQueryClient();

  const invalidateQueries = (variables: ExtendedPermissionParams) => {
    // Инвалидируем кэш проекта
    queryClient.invalidateQueries({ queryKey: ["project", variables.projectId] });
    // Инвалидируем кэш пользователя
    queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
  };

  const addPermission = useMutation({
    mutationFn: async ({ projectId, userId }: ExtendedPermissionParams) => {
      await client.addExtendedPermission(projectId, userId);
    },
    onSuccess: (_, variables) => {
      invalidateQueries(variables);
    },
  });

  const removePermission = useMutation({
    mutationFn: async ({ projectId, userId }: ExtendedPermissionParams) => {
      await client.removeExtendedPermission(projectId, userId);
    },
    onSuccess: (_, variables) => {
      invalidateQueries(variables);
    },
  });

  return {
    addPermission,
    removePermission,
  };
}; 