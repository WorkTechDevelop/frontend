"use client";

import { LogOut, Loader } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/controls/avatar";
import { DottedSeparator } from "@/components/feedback/dotted-separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/layout/dropdown-menu";

import { useLogout } from "../api/use-logout";
import { useCurrent } from "../api/use-current";

export const UserButton = () => {
  const { data: user, isLoading } = useCurrent();
  const { mutate: logout } = useLogout();

  if (isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) return null;

  const { firstName, lastName, email } = user;
  const fullName = `${firstName} ${lastName}`.trim();

  const avatarFallback = firstName
    ? firstName.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] border border-neutral-300">
            <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {fullName || "Пользователь"}
            </p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>
        <DottedSeparator className="mb-1" />
        <DropdownMenuItem
          className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer"
          onClick={() => logout()}
        >
          <LogOut className="size-4 mr-2" />
          Выход
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
