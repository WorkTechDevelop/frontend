"use client";

import { ResponsiveModal } from "@/components/feedback/responsive-modal";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { CreateProjectForm } from "./create-project-form";
import { useCreateProjectModal } from "../hooks/use-create-project-modal";

export const CreateProjectModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProjectModal();
  const { isAdmin } = useAuth();

  // Не рендерим модальное окно для админа
  if (isAdmin) return null;

  return (
    <ResponsiveModal 
      open={isOpen} 
      onOpenChange={setIsOpen}
      title="Создать новый проект"
      description="Заполните форму для создания нового проекта в WorkTech"
    >
      <CreateProjectForm onCancel={close} />
    </ResponsiveModal>
  );
};
