import { Suspense } from "react";

import type { Metadata } from "next";

import { PROFILE_TITLE } from "@/features/profile/lib/constants";

import { Button } from "@/components/ui/button";

import UserCard from "@/features/profile/components/user-card";

import AccountCard from "@/features/profile/components/account-card";

import PersonalCard from "@/features/profile/components/personal-card";

import DangerZoneCard from "@/features/profile/components/danger-zone-card";

import { Header, HeaderTitle } from "@/features/dashboard/components/header";

import UserCardSkeleton from "@/features/profile/components/user-card-skeleton";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: PROFILE_TITLE,
};

export default function ProfilePage() {
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
              <PersonalCard />
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
