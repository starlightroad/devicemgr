import type { Metadata } from "next";

import { getUserNameAndEmail } from "@/dal/user";

import { PROFILE_TITLE } from "@/features/profile/lib/constants";

import { getUserInitials } from "@/features/dashboard/lib/utils";

import { AVATAR_FALLBACK_DELAY } from "@/features/dashboard/lib/constants";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import { Header, HeaderTitle } from "@/features/dashboard/components/header";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import ThemeChoiceCard from "@/features/profile/components/theme-choice-card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: PROFILE_TITLE,
};

export default async function ProfilePage() {
  const user = await getUserNameAndEmail();

  return (
    <div className="mx-auto pb-5 md:max-w-xl">
      <Header>
        <HeaderTitle>Profile</HeaderTitle>
      </Header>
      <main>
        <article className="mb-5">
          <Card>
            <CardContent>
              <div className="flex items-center gap-2">
                <Avatar size="lg">
                  <AvatarImage alt={user.name} src="/avatar.png" />
                  <AvatarFallback delay={AVATAR_FALLBACK_DELAY}>{getUserInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium">{user.name}</h2>
                  <p className="text-muted-foreground">Joined October 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>
        <Tabs defaultValue="personal" className="gap-5">
          <TabsList className="w-full">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <article>
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
                    <Button type="button" variant="outline">
                      Update Name
                    </Button>
                  </section>
                  <Separator />
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    <Button type="button" variant="outline">
                      Change Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </article>
          </TabsContent>
          <TabsContent value="account" className="space-y-4">
            <article>
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
                    <Button type="button" variant="outline">
                      Download
                    </Button>
                  </section>
                  <Separator />
                  <section className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="font-medium">Session</h3>
                      <p className="text-muted-foreground">
                        Active since <strong className="font-medium">April 20, 2026 7:11 PM</strong>.
                      </p>
                    </div>
                    <Button type="button" variant="outline">
                      Sign Out
                    </Button>
                  </section>
                </CardContent>
              </Card>
            </article>
            <article>
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
                    <Button type="button" variant="destructive">
                      Delete Account
                    </Button>
                  </section>
                </CardContent>
              </Card>
            </article>
          </TabsContent>
          <TabsContent value="security">
            <article>
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
            </article>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
