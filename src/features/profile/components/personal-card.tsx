import { getUserNameAndEmail } from "@/dal/user";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import UpdateNameForm from "@/features/profile/components/update-name-form";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PersonalCard() {
  const user = await getUserNameAndEmail();

  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <section className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-medium">Name</h3>
            <p className="text-muted-foreground">{user.name}</p>
          </div>
          <UpdateNameForm userName={user.name} />
        </section>
        <Separator />
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <Button type="button" variant="outline" disabled>
            Change Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
