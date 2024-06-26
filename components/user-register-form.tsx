"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Icon } from "./icon";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signUpSchema, signUpSchemaType } from "@/lib/validations/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "./ui/use-toast";
import { z } from "zod";

type FormData = z.infer<typeof signUpSchema>;

export default function UserRegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return toast({
        title: "サインアップに失敗しました",
        description: "サインアップに失敗しました、もう一度お試し下さい",
        variant: "destructive",
      });
    }

    const signInResult = await signIn("credentials", {
      email: data.email.toLowerCase(),
      password: data.password,
      callbackUrl: "/dashboard",
      redirect: false,
    });

    if (!signInResult?.ok) {
      return toast({
        title: "サインインに失敗しました",
        description: "ログイン画面よりログインをお試し下さい",
        variant: "destructive",
      });
    } else {
      window.location.href = "/dashboard";
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="name">名前</Label>
            <Input
              id="name"
              placeholder="ヤマダ タロウ"
              type="text"
              required
              {...register("name")}
            />
            {errors.name && <span>{errors.name.message}</span>}
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              required
              {...register("email")}
            />
            {errors.email && <span>{errors.email.message}</span>}
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              placeholder="6文字以上必要"
              type="password"
              required
              {...register("password")}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <button className={cn(buttonVariants())}>
            {isLoading && <Icon.spinner className="mr-2 animate-spin" />}
            アカウント作成
          </button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="text-muted-foreground px-2 bg-background">or</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => {
            setIsGithubLoading(true);
            signIn("github");
          }}
        >
          {isGithubLoading ? (
            <Icon.spinner className="mr-2 animate-spin" />
          ) : (
            <Icon.github className="mr-2" />
          )}
          GitHub
        </button>
        <button
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => {
            setIsGoogleLoading(true);
            signIn("google");
          }}
        >
          {isGoogleLoading ? (
            <Icon.spinner className="mr-2 animate-spin" />
          ) : (
            <Icon.google className="mr-2" />
          )}
          Google
        </button>
      </div>
    </div>
  );
}
