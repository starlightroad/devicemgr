import { Avatar } from "@heroui/react";

import { getUserNameAndEmail } from "@/dal/user";

import { AVATAR_FALLBACK_DELAY, getUserInitials } from "@/features/dashboard";

export default async function UserProfile() {
  const user = await getUserNameAndEmail();

  return (
    <div className="my-5 flex items-center gap-2 px-1">
      <Avatar size="sm" color="accent">
        <Avatar.Image alt={user.name} src="/avatar.png" />
        <Avatar.Fallback delayMs={AVATAR_FALLBACK_DELAY}>{getUserInitials(user.name)}</Avatar.Fallback>
      </Avatar>
      <div className="flex flex-col text-left">
        <p className="text-foreground text-sm leading-tight font-medium">{user.name}</p>
        <p className="text-muted text-xs leading-tight">{user.email}</p>
      </div>
    </div>
  );
}
