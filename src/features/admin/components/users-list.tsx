"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/layout/card";
import { Button } from "@/components/ui/controls/button";
import { Badge } from "@/components/ui/feedback/badge";
import { UserX, UserCheck, Shield, ShieldOff } from "lucide-react";
import { RoleGuard } from "@/features/auth/components/role-guard";
import { useGetUsers } from "../api/use-get-users";
import { useGetUserInfo } from "../api/use-get-user-info";
import { useManageUsers } from "../api/use-manage-users";
import { ROLES } from "@/features/auth/constants";

export const UsersList = () => {
  const { data: users, isLoading } = useGetUsers();
  const { blockUsers, activateUsers, updateUserRoles } = useManageUsers();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  // Получаем полную информацию о выбранном пользователе
  const { data: selectedUserInfo } = useGetUserInfo(selectedUserId || undefined);

  const handleBlockUsers = async () => {
    try {
      await blockUsers.mutateAsync(selectedUsers);
      setSelectedUsers([]);
      setSelectedUserId(null);
    } catch (error) {
      console.error("Failed to block users:", error);
    }
  };

  const handleActivateUsers = async () => {
    try {
      await activateUsers.mutateAsync(selectedUsers);
      setSelectedUsers([]);
      setSelectedUserId(null);
    } catch (error) {
      console.error("Failed to activate users:", error);
    }
  };

  const handleToggleAdmin = async (userId: string, isAdmin: boolean) => {
    try {
      const roleIds = isAdmin 
        ? [] // Снимаем роль админа
        : ["admin_role_id"]; // TODO: Заменить на реальный ID роли админа
      await updateUserRoles.mutateAsync({ userId, roleIds });
    } catch (error) {
      console.error("Failed to update user roles:", error);
    }
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
    setSelectedUserId(prev => prev === userId ? null : userId);
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <RoleGuard permissions={["manage_users", "view_users_list"]}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Пользователи системы</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="destructive"
              onClick={handleBlockUsers}
              disabled={selectedUsers.length === 0}
            >
              <UserX className="mr-2 h-4 w-4" />
              Заблокировать
            </Button>
            <Button
              variant="outline"
              onClick={handleActivateUsers}
              disabled={selectedUsers.length === 0}
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Разблокировать
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users?.map((user) => {
              const isSelected = selectedUsers.includes(user.id);
              const isUserSelected = selectedUserId === user.id;
              const isAdmin = isUserSelected && selectedUserInfo?.roles?.some(role => role.roleCode === ROLES.ADMIN);

              return (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-4 border rounded-lg ${
                    isSelected ? "bg-primary/5" : ""
                  }`}
                  onClick={() => handleUserSelect(user.id)}
                >
                  <div className="space-y-1">
                    <p className="font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {isUserSelected && (
                      <>
                        <Badge
                          variant={selectedUserInfo?.active ? "default" : "destructive"}
                        >
                          {selectedUserInfo?.active ? "Активен" : "Заблокирован"}
                        </Badge>
                        {selectedUserInfo?.roles?.map(role => (
                          <Badge key={role.roleId} variant="secondary">
                            {role.roleName}
                          </Badge>
                        ))}
                      </>
                    )}
                    <RoleGuard permissions="manage_admins">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleAdmin(user.id, !!isAdmin);
                        }}
                      >
                        {isAdmin ? (
                          <>
                            <ShieldOff className="mr-2 h-4 w-4" />
                            Снять админа
                          </>
                        ) : (
                          <>
                            <Shield className="mr-2 h-4 w-4" />
                            Назначить админом
                          </>
                        )}
                      </Button>
                    </RoleGuard>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </RoleGuard>
  );
}; 