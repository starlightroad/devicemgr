import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DangerZoneCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>
        <CardDescription>Destructive actions that are irreversible.</CardDescription>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-medium">Delete Account</h3>
            <p className="text-muted-foreground">Permanently delete you account and all associated data.</p>
          </div>
          <Button type="button" variant="destructive" disabled>
            Delete Account
          </Button>
        </section>
      </CardContent>
    </Card>
  );
}
