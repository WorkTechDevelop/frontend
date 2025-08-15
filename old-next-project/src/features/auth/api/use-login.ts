import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { LoginRequestDTO, UserDataDto } from "@/lib/types.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RequestType = LoginRequestDTO;
type ResponseType = UserDataDto;

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json: RequestType) => {
      // 1. Логинимся и сохраняем токены
      const { email, password } = json;
      const loginResponse = await client.login(String(email ?? ''), String(password ?? ''));
      if (loginResponse.accessToken) {
        client.setToken(loginResponse.accessToken);
        if (typeof window !== 'undefined') {
          localStorage.setItem('refresh_token', loginResponse.refreshToken ?? '');
        }
      } else {
        throw new Error('Не удалось получить токен');
      }
      // 2. Получаем данные пользователя
      const user = await client.getUserProfile();
      if (!user) throw new Error('Не удалось получить данные пользователя');
      // 2.1. Если вдруг user.roles отсутствует или пустой, пробуем получить роли отдельно
      if (!user.roles || user.roles.length === 0) {
        try {
          const rolesResp = await client.getRoles();
          if (rolesResp.roles) {
            user.roles = rolesResp.roles;
          }
        } catch {
          // ignore
        }
      }
      // 3. Сохраняем пользователя в localStorage (если нужно)
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    },
    onSuccess: (user) => {
      const roles = user.roles && user.roles.length > 0
        ? user.roles.map(r => r.roleName || r.roleCode).join(', ')
        : 'роль не определена';
      toast.success(`Добро пожаловать, ${user.firstName} (${roles})!`);
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Ошибка входа");
    },
  });

  return mutation;
};
