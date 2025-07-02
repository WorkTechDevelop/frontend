"use client";

import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/form/input";
import { Button } from "@/components/ui/controls/button";
import { DottedSeparator } from "@/components/feedback/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/layout/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form/form";

import { loginSchema } from "../schemas";
import { useLogin } from "../api/use-login";

export const SignInCard = () => {
  const { mutate, isPending } = useLogin();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate(values);
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Добро пожаловать в WorkTech!</CardTitle>
      </CardHeader>
      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>
      <CardContent className="px-7">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Введите email"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Введите пароль"
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} size="lg" className="w-full">
              Войти
            </Button>
          </form>
        </Form>
      </CardContent>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7 flex items-center justify-center">
        <p>
          Нет аккаунта?
          <Link href="/sign-up">
            <span className="text-blue-700">&nbsp;Зарегистрироваться</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
