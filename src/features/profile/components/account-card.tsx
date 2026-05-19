import { Separator } from "@/components/ui/separator";

import SignOutButton from "@/features/profile/components/sign-out-button";

import ThemeChoiceCard from "@/features/profile/components/theme-choice-card";

import SessionDescription from "@/features/profile/components/session-description";

import AccountDataDownload from "@/features/profile/components/account-data-download";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <section>
          <h3 className="mb-1.5 font-medium">Theme</h3>
          <ThemeChoiceCard />
        </section>
        <Separator />
        <section className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-medium">Data</h3>
            <p className="text-muted-foreground">Download a copy of your devices.</p>
          </div>
          <AccountDataDownload />
        </section>
        <Separator />
        <section className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-medium">Session</h3>
            <SessionDescription />
          </div>
          <SignOutButton />
        </section>
      </CardContent>
    </Card>
  );
}
