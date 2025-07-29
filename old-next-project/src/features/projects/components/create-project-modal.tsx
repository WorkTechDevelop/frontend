"use client";

import { ResponsiveModal } from "@/components/feedback/responsive-modal";

import { CreateProjectForm } from "./create-project-form";

import { useCreateProjectModal } from "../hooks/use-create-project-modal";

export const CreateProjectModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProjectModal();

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
