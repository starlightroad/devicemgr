import { Suspense } from "react";

import type { Metadata } from "next";

import { PROFILE_TITLE } from "@/features/profile/lib/constants";

import UserCard from "@/features/profile/components/user-card";

import AccountCard from "@/features/profile/components/account-card";

import PersonalCard from "@/features/profile/components/personal-card";

import SecurityCard from "@/features/profile/components/security-card";

import DangerZoneCard from "@/features/profile/components/danger-zone-card";

import { Header, HeaderTitle } from "@/features/dashboard/components/header";

import UserCardSkeleton from "@/features/profile/components/user-card-skeleton";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PersonalCardSkeleton from "@/features/profile/components/personal-card-skeleton";

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
              <Suspense fallback={<PersonalCardSkeleton />}>
                <PersonalCard />
              </Suspense>
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
              <SecurityCard />
            </article>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
