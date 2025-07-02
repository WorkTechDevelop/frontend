import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      // Очищаем токены на клиенте
      client.clearToken();
    },
    onSuccess: () => {
      toast.success("Вы вышли из системы");
      router.push("/sign-in");
      queryClient.invalidateQueries({ queryKey: ["current"] });
      queryClient.clear(); // Очищаем весь кеш
    },
    onError: (error: Error) => {
      toast.error(error.message || "Ошибка выхода");
    },
  });

  return mutation;
};
