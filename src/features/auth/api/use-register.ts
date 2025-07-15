import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { RegisterDTO } from "@/lib/types.api";
import { toast } from "sonner";

type RequestType = RegisterDTO;
type ResponseType = string;

export const useRegister = () => {
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json: RequestType) => {
      const response = await client.register(json);
      return response;
    },
    onSuccess: () => {
      toast.success("Регистрация успешна! Проверьте email для подтверждения");
      router.push("/sign-in");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Ошибка регистрации");
    },
  });

  return mutation;
};
