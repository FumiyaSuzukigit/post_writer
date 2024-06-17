import UserAuthForm from "@/components/user-auth-form";
import Link from "next/link";

export default function Login() {
  return (
    <div className="container flex flex-col justify-center h-screen w-screen items-center">
      <div className="mx-auto w-full sm:w-[350px] flex flex-col justify-center space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-sxl font-semibold tracking-tight">
            Welcome Back{" "}
          </h1>
          <p className="text-sm text-muted-foreground">
            メールアドレスを入力でログインできます。
          </p>
        </div>
        <UserAuthForm />
        <p className="text-center text-muted-foreground px-8 text-sm">
          <Link href={"/register"} className="underline underline-offset-4">
            アカウントを持っていませんか？
          </Link>
        </p>
      </div>
    </div>
  );
}
