import { useMedia } from "react-use";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/layout/dialog";
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from "@/components/ui/layout/drawer";
import { VisuallyHidden } from "@/components/ui/feedback/visually-hidden";

interface ResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export const ResponsiveModal = ({
  children,
  onOpenChange,
  open,
  title,
  description,
}: ResponsiveModalProps) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]">
          <VisuallyHidden>
            <DialogTitle>
              {title || "Модальное окно"}
            </DialogTitle>
            <DialogDescription>
              {description || "Модальное окно для взаимодействия с приложением"}
            </DialogDescription>
          </VisuallyHidden>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <VisuallyHidden>
          <DrawerTitle>
            {title || "Модальное окно"}
          </DrawerTitle>
          <DrawerDescription>
            {description || "Модальное окно для взаимодействия с приложением"}
          </DrawerDescription>
        </VisuallyHidden>
        <div className="overflow-y-auto hide-scrollbar max-h-[85vh]">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
