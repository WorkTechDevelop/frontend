import Link from "next/link";
import Image from "next/image";

import { Projects } from "../data-display/projects";
import { Navigation } from "../navigation/navigation";
import { DottedSeparator } from "../feedback/dotted-separator";
import { WorkspaceSwitcher } from "../navigation/workspace-switcher";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={164} height={48} />
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
      <DottedSeparator className="my-4" />
      <Projects />
    </aside>
  );
};
