import { getSessionDate } from "@/dal/session";

import { getSessionDateAndTime } from "@/features/profile/lib/utils";

export default async function SessionDescription() {
  const sessionDate = await getSessionDate();

  const sessionDateAndTime = getSessionDateAndTime(sessionDate);

  return (
    <p className="text-muted-foreground">
      Active since <strong className="font-medium">{sessionDateAndTime}</strong>.
    </p>
  );
}
