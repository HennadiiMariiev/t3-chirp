import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { prepareUserInitials } from "~/utils/prepareUserInitials";

function UserInfo() {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn || !user) {
    return null;
  }

  const userMeta = `${user?.firstName as string} ${user?.lastName as string}`;

  return (
    <div className="mr-4 flex items-center justify-center text-xs sm:text-base">
      {user?.profileImageUrl ? (
        <Image
          src={user?.profileImageUrl}
          alt={userMeta}
          width={38}
          height={38}
          className="rounded-full sm:mr-2"
        />
      ) : (
        <span className="block h-[38] w-[38] rounded-full bg-slate-200 text-neutral-800 sm:mr-2">
          {prepareUserInitials(userMeta)}
        </span>
      )}
      <span className="hidden sm:inline">{userMeta}</span>
    </div>
  );
}

export default UserInfo;
