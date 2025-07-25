import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useManageProjectOwners = () => {
  const queryClient = useQueryClient();

  const updateProjectOwner = useMutation({
    mutationFn: async ({ projectId, userId }: { projectId: string; userId: string }) => {
      await client.updateProjectOwner(projectId, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const addExtendedPermission = useMutation({
    mutationFn: async ({ projectId, userId }: { projectId: string; userId: string }) => {
      await client.addExtendedPermission(projectId, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const removeExtendedPermission = useMutation({
    mutationFn: async ({ projectId, userId }: { projectId: string; userId: string }) => {
      await client.removeExtendedPermission(projectId, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    updateProjectOwner,
    addExtendedPermission,
    removeExtendedPermission,
  };
}; 