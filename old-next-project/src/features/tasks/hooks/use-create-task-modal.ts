import { useQueryState, parseAsBoolean, parseAsString } from "nuqs";

import { TaskStatus } from "../types";

export const useCreateTaskModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-task",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );
  const [status, setStatus] = useQueryState(
    "create-task-stauts",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );

  const open = (initialStatus?: TaskStatus) => {
    setIsOpen(true);
    setStatus(initialStatus ? (initialStatus as string) : "");
  };

  const close = () => {
    setIsOpen(false);
    setStatus("");
  };

  return { isOpen, open, close, setIsOpen, status };
};
