import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { ShortProjectDataDto } from "@/lib/types.api";

export const useGetProjectsList = () => {
  return useQuery({
    queryKey: ["admin-projects-list"],
    queryFn: async (): Promise<ShortProjectDataDto[]> => {
      try {
        // TODO: Заменить на правильный endpoint, когда будет готов
        // Сейчас используем заглушку
        return [
          {
            id: "1",
            name: "Проект А",
            code: "PROJ-A",
            description: "Краткое описание проекта А",
          },
          {
            id: "2",
            name: "Проект Б",
            code: "PROJ-B",
            description: "Краткое описание проекта Б",
          }
        ];
      } catch (error) {
        console.error("Failed to fetch projects list:", error);
        throw new Error("Failed to fetch projects list");
      }
    },
    staleTime: 10 * 60 * 1000, // 10 минут
  });
}; 