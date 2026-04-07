"use server";

import { headers } from "next/headers";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export const getSession = async () => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (!data?.session.userId) {
    redirect("/login");
  }

  return {
    userId: data.session.userId,
  };
};
