"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
import PageLoader from "@/components/feedback/page-loader";
import { Button } from "@/components/ui/controls/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/layout/card";
import { Badge } from "@/components/ui/feedback/badge";
import { Separator } from "@/components/ui/layout/separator";
import { 
  UserIcon, 
  MailIcon, 
  CalendarIcon, 
  ShieldIcon,
  LogOutIcon,
  SettingsIcon 
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const { data: user, isLoading: isLoadingUser } = useCurrent();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  useEffect(() => {
    if (!user && !isLoadingUser) {
      router.push("/sign-in");
    }
  }, [user, isLoadingUser, router]);

  if (isLoadingUser) {
    return <PageLoader />;
  }

  if (!user) {
    return <PageLoader />;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Не указано";
    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <SettingsIcon className="size-8" />
        <div>
          <h1 className="text-2xl font-bold">Настройки</h1>
          <p className="text-gray-600">Управляйте вашими настройками и профилем</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Профиль пользователя */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="size-5" />
              Профиль пользователя
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Имя</label>
                <div className="font-medium">{user.firstName}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Фамилия</label>
                <div className="font-medium">{user.lastName}</div>
              </div>
            </div>

            {user.middleName && (
              <div>
                <label className="text-sm font-medium text-gray-500">Отчество</label>
                <div className="font-medium">{user.middleName}</div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <MailIcon className="size-4 text-gray-500" />
              <span className="text-sm text-gray-500">Email:</span>
              <span className="font-medium">{user.email}</span>
            </div>

            {user.phone && (
              <div>
                <label className="text-sm font-medium text-gray-500">Телефон</label>
                <div className="font-medium">{user.phone}</div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <CalendarIcon className="size-4 text-gray-500" />
              <span className="text-sm text-gray-500">Дата рождения:</span>
              <span className="font-medium">{formatDate(user.birthDate)}</span>
            </div>

            <div className="flex items-center gap-2">
              <UserIcon className="size-4 text-gray-500" />
              <span className="text-sm text-gray-500">Пол:</span>
              <Badge variant="outline">
                {user.gender === 'MALE' ? 'Мужской' : 'Женский'}
              </Badge>
            </div>

            <Separator />

            <Button variant="outline" className="w-full" disabled>
              Редактировать профиль
              <span className="ml-auto text-xs text-gray-400">(скоро)</span>
            </Button>
          </CardContent>
        </Card>

        {/* Информация об аккаунте */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldIcon className="size-5" />
              Информация об аккаунте
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">ID пользователя</label>
              <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                {user.userId}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Роль</label>
              <div className="font-medium">{user.roles && user.roles.length > 0 ? user.roles.map(r => r.roleName || r.roleCode).join(', ') : 'роль не определена'}</div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Статус аккаунта:</span>
              <Badge className={user.active ? "bg-green-500" : "bg-red-500"}>
                {user.active ? "Активен" : "Неактивен"}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-3">
              <Button variant="outline" className="w-full" disabled>
                Сменить пароль
                <span className="ml-auto text-xs text-gray-400">(скоро)</span>
              </Button>

              <Button 
                variant="outline" 
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOutIcon className="size-4 mr-2" />
                {isLoggingOut ? "Выходим..." : "Выйти из аккаунта"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Настройки приложения */}
      <Card>
        <CardHeader>
          <CardTitle>Настройки приложения</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Уведомления</h3>
              <p className="text-sm text-gray-600 mb-3">
                Настройка email и push уведомлений
              </p>
              <Button variant="outline" size="sm" disabled>
                Настроить
                <span className="ml-auto text-xs text-gray-400">(скоро)</span>
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Интерфейс</h3>
              <p className="text-sm text-gray-600 mb-3">
                Тема, язык и персонализация
              </p>
              <Button variant="outline" size="sm" disabled>
                Настроить
                <span className="ml-auto text-xs text-gray-400">(скоро)</span>
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Безопасность</h3>
              <p className="text-sm text-gray-600 mb-3">
                Двухфакторная аутентификация и API ключи
              </p>
              <Button variant="outline" size="sm" disabled>
                Настроить
                <span className="ml-auto text-xs text-gray-400">(скоро)</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 