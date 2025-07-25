import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { ShortProjectDataDto } from "@/lib/types.api";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useCurrent } from "@/features/auth/api/use-current";

export const useGetProjects = () => {
  const { data: user, isLoading: isLoadingUser } = useCurrent();
  const { isAdmin } = useAuth();

  const query = useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<ShortProjectDataDto[]> => {
      try {
        const response = await client.getAllUserProjects();
        return response;
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        throw new Error("Failed to fetch projects");
      }
    },
    staleTime: 10 * 60 * 1000, // 10 минут
    // Отключаем запрос для админа и ждем загрузки пользователя
    enabled: !isAdmin && !isLoadingUser,
  });
  
  // Для админа возвращаем пустой массив
  if (isAdmin) {
    return {
      ...query,
      data: [],
      isLoading: false,
    };
  }

  return query;
};
