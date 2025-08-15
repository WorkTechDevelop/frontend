import { create } from "zustand";
import { useAuth } from "@/features/auth/hooks/use-auth";

interface CreateProjectModalStore {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const useCreateProjectModalStore = create<CreateProjectModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));

export const useCreateProjectModal = () => {
  const { isAdmin } = useAuth();
  const store = useCreateProjectModalStore();

  return {
    isOpen: store.isOpen,
    setIsOpen: (open: boolean) => {
      // Не открываем модальное окно для админа
      if (isAdmin) return;
      store.setIsOpen(open);
    },
    open: () => {
      // Не открываем модальное окно для админа
      if (isAdmin) return;
      store.setIsOpen(true);
    },
    close: () => store.setIsOpen(false),
  };
};
