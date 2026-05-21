import { getAccountUpdatedDate } from "@/dal/account";

import { formatRelativeTime } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SecurityCard() {
  const passwordLastChangedDate = await getAccountUpdatedDate();

  const passwordLastChanged = formatRelativeTime(passwordLastChangedDate);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Manage your account security.</CardDescription>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-medium">Password</h3>
            <p className="text-muted-foreground">
              Last changed <strong className="font-medium">{passwordLastChanged}</strong>.
            </p>
          </div>
          <Button type="button" variant="outline" disabled>
            Change Password
          </Button>
        </section>
      </CardContent>
    </Card>
  );
}
