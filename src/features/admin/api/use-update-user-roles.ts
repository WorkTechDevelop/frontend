import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { StringIdsDto, UserDataDto } from "@/lib/types.api";

interface UpdateUserRolesParams {
  userId: string;
  roleIds: string[];
}

export const useUpdateUserRoles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, roleIds }: UpdateUserRolesParams): Promise<UserDataDto> => {
      const data: StringIdsDto = { ids: roleIds };
      return await client.updateUserRoles(userId, data);
    },
    onSuccess: (data, variables) => {
      // Инвалидируем кэш списка пользователей
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // Обновляем кэш конкретного пользователя
      queryClient.setQueryData(["user", variables.userId], data);
      // Если это текущий пользователь - обновляем его кэш
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
  });
}; 