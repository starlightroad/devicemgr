import { Suspense } from "react";

import type { Metadata } from "next";

import { getUserNameAndEmail } from "@/dal/user";

import { PROFILE_TITLE } from "@/features/profile/lib/constants";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import UserCard from "@/features/profile/components/user-card";

import AccountCard from "@/features/profile/components/account-card";

import DangerZoneCard from "@/features/profile/components/danger-zone-card";

import { Header, HeaderTitle } from "@/features/dashboard/components/header";

import UserCardSkeleton from "@/features/profile/components/user-card-skeleton";

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
          <Suspense fallback={<UserCardSkeleton />}>
            <UserCard />
          </Suspense>
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
              <AccountCard />
            </article>
            <article>
              <DangerZoneCard />
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
