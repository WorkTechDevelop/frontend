"use client";

export const WorkspaceSwitcher = () => {
  return (
    <div className="flex items-center gap-2 p-1">
      <div className="size-8 relative rounded-md bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <span className="text-white font-semibold text-sm">WT</span>
      </div>
      <span className="font-semibold">WorkTech</span>
    </div>
  );
};
