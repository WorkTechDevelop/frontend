"use client";

import { MenuIcon } from "lucide-react";

import { Sidebar } from "./sidebar";
import { Button } from "../ui/controls/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "../ui/layout/sheet";
import { VisuallyHidden } from "../ui/feedback/visually-hidden";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" className="lg:hidden">
          <MenuIcon className="size-4 text-neutral-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <VisuallyHidden>
          <SheetTitle>Навигационное меню</SheetTitle>
          <SheetDescription>Боковое меню для навигации по приложению</SheetDescription>
        </VisuallyHidden>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
