import type { Metadata } from "next";

import { APP_NAME } from "@/lib/contants";

import { LoginForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Login",
  description: `Login to ${APP_NAME} to view your devices.`,
};

export default function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-96 px-5 sm:px-0">
      <section className="py-24">
        <div className="bg-transparent sm:rounded-3xl sm:border sm:border-neutral-200 sm:bg-white sm:p-6">
          <h1 className="text-center text-xl font-semibold text-gray-600">Welcome Back</h1>
          <p className="mt-3 mb-8 text-center text-sm text-gray-500">Log in to {APP_NAME} to continue.</p>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
