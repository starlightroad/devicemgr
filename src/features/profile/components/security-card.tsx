import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SecurityCard() {
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
            <p className="text-muted-foreground">Last changed 1 month ago.</p>
          </div>
          <Button type="button" variant="outline">
            Change Password
          </Button>
        </section>
      </CardContent>
    </Card>
  );
}
