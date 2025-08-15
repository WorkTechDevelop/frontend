"use client";

import { ResponsiveModal } from "@/components/feedback/responsive-modal";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { CreateTaskFormWrapper } from "./create-task-form-wrapper";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen, close } = useCreateTaskModal();
  const { isAdmin } = useAuth();

  // Не рендерим модальное окно для админа
  if (isAdmin) return null;

  return (
    <ResponsiveModal 
      open={isOpen} 
      onOpenChange={setIsOpen}
      title="Создать новую задачу"
      description="Заполните форму для создания новой задачи в выбранном проекте"
    >
      <CreateTaskFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
};
