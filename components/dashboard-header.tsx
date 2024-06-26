interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export default function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center px-2">
      <div className="grid gap-1">
        <h1 className="text-3xl font-extrabold md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
        <p className="text-red-500">
          ※試験運用中の為、投稿は予告なく削除する場合があります
        </p>
      </div>
      {children}
    </div>
  );
}
