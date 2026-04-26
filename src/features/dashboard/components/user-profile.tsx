import { getUserNameAndEmail } from "@/dal/user";

import { getUserInitials } from "@/features/dashboard/lib/utils";

import { AVATAR_FALLBACK_DELAY } from "@/features/dashboard/lib/constants";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function UserProfile() {
  const user = await getUserNameAndEmail();

  return (
    <div className="my-4 flex items-center gap-2 px-3">
      <Avatar>
        <AvatarImage alt={user.name} src="/avatar.png" />
        <AvatarFallback delay={AVATAR_FALLBACK_DELAY}>{getUserInitials(user.name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-left">
        <p className="text-sm leading-tight font-medium">{user.name}</p>
        <p className="text-muted-foreground text-xs leading-tight">{user.email}</p>
      </div>
    </div>
  );
}
