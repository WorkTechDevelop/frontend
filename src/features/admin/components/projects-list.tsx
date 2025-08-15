"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/layout/card";
import { Badge } from "@/components/ui/feedback/badge";
import { RoleGuard } from "@/features/auth/components/role-guard";
import { useGetProjectsList } from "../api/use-get-projects-list";

export const ProjectsList = () => {
  const { data: projects, isLoading } = useGetProjectsList();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <RoleGuard permissions="view_projects_list">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Проекты в системе</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects?.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">{project.name}</p>
                    <Badge variant="outline">{project.code}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </RoleGuard>
  );
}; 