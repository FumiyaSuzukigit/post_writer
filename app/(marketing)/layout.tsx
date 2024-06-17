import MainNav from "@/components/main-nav";
import SiteFooter from "@/components/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { marketingConfig } from "@/config/marketing";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <div>
      <header className="container z-40 bg-background">
        <div className="h-20 py-6 flex items-center justify-between">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            {user ? (
              <div className="flex gap-4">
                <Link
                  href={"/dashboard"}
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "px-4"
                  )}
                >
                  ダッシュボード
                </Link>
                <Link
                  href={"/api/auth/signout"}
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "px-4"
                  )}
                >
                  ログアウト
                </Link>
              </div>
            ) : (
              <Link
                href={"/login"}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4"
                )}
              >
                ログイン
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
