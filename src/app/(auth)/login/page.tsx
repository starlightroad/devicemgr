import type { Metadata } from "next";

import { Card } from "@heroui/react";

import { APP_NAME } from "@/lib/constants";

import LoginForm from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: `Login to ${APP_NAME} to view your devices.`,
};

export default function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-96 px-5 sm:px-0">
      <section className="py-24">
        <Card>
          <Card.Header>
            <Card.Title className="text-center text-xl font-semibold">Welcome Back</Card.Title>
            <Card.Description className="mt-3 mb-8 text-center text-sm">
              Log in to {APP_NAME} to continue.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <LoginForm />
          </Card.Content>
        </Card>
      </section>
    </main>
  );
}
