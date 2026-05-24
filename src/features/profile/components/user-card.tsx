import { getUser } from "@/dal/user";

import { getUserInitials } from "@/features/dashboard/lib/utils";

import { getAnniversaryDate } from "@/features/profile/lib/utils";

import { AVATAR_FALLBACK_DELAY } from "@/features/dashboard/lib/constants";

import { Card, CardContent } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function UserCard() {
  const user = await getUser();

  if (!user) return null;

  const { name, createdAt } = user;

  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-2">
          <Avatar size="lg">
            <AvatarImage alt={name} src="/avatar.png" />
            <AvatarFallback delay={AVATAR_FALLBACK_DELAY}>{getUserInitials(name)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium">{name}</h2>
            <p className="text-muted-foreground">Joined {getAnniversaryDate(createdAt)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
