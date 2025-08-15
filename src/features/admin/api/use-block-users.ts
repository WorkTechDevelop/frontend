import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { StringIdsDto } from "@/lib/types.api";

export const useBlockUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userIds: string[]) => {
      const data: StringIdsDto = { ids: userIds };
      await client.blockUsers(data);
    },
    onSuccess: () => {
      // Инвалидируем кэш списка пользователей и текущего пользователя
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
  });
}; 