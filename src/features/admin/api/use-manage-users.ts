import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { StringIdsDto, UserDataDto } from "@/lib/types.api";

export const useManageUsers = () => {
  const queryClient = useQueryClient();

  const blockUsers = useMutation({
    mutationFn: async (userIds: string[]) => {
      const data: StringIdsDto = { ids: userIds };
      await client.blockUsers(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const activateUsers = useMutation({
    mutationFn: async (userIds: string[]) => {
      const data: StringIdsDto = { ids: userIds };
      await client.activateUsers(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const updateUserRoles = useMutation({
    mutationFn: async ({ userId, roleIds }: { userId: string; roleIds: string[] }) => {
      const data: StringIdsDto = { ids: roleIds };
      return await client.updateUserRoles(userId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    blockUsers,
    activateUsers,
    updateUserRoles,
  };
}; 