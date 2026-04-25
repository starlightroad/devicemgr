import type { Metadata } from "next";

import { APP_NAME } from "@/lib/constants";

import LoginForm from "@/features/auth/components/login-form";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Login",
  description: `Login to ${APP_NAME} to view your devices.`,
};

export default function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-96 px-5 sm:px-0">
      <section className="py-24">
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Log in to {APP_NAME} to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
