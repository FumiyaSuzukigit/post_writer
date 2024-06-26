"use client";

import Image from "next/image";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

interface UserIconProps {
  userId: string;
}

function UserIcon({ userId }: UserIconProps) {
  const { data: user, error } = useSWR(`/api/user?userId=${userId}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <Image
      width={40}
      height={40}
      alt="profile_icon"
      src={user.image || "/default_icon.png"}
      className="rounded-full"
    />
  );
}

export default UserIcon;
