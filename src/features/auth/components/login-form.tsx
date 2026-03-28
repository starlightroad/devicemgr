"use client";

import { useActionState, useState } from "react";

import { Button, Field, Form } from "@base-ui/react";

import usersJSON from "@/lib/data/users.json";

import { authenticateUser } from "@/features/auth";

export default function LoginForm() {
  const [state, formAction, loading] = useActionState(authenticateUser, undefined);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <Form action={formAction} errors={state?.serverErrors} className="flex flex-col gap-4">
      <Field.Root name="email" className="flex flex-col gap-1">
        <Field.Label className="sr-only">Email</Field.Label>
        <Field.Control
          type="email"
          required
          placeholder="Email"
          autoComplete="off"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="h-10 w-full rounded-md border border-neutral-200 pl-4 text-base text-neutral-900 focus:outline-2 focus:outline-offset-1 focus:outline-neutral-400"
        />
        <Field.Error className="text-sm text-red-800" />
      </Field.Root>
      <Field.Root name="password" className="flex flex-col gap-1">
        <Field.Label className="sr-only">Password</Field.Label>
        <Field.Control
          type="password"
          required
          placeholder="Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          className="h-10 w-full rounded-md border border-neutral-200 pl-4 text-base text-neutral-900 focus:outline-2 focus:outline-offset-1 focus:outline-neutral-400"
        />
        <Field.Error className="text-sm text-red-800" />
      </Field.Root>
      <Button
        disabled={loading}
        focusableWhenDisabled
        type="submit"
        className="flex h-10 cursor-pointer items-center justify-center rounded-md border border-neutral-200 bg-neutral-800 px-3.5 text-base leading-6 font-medium text-white outline-0 select-none hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-neutral-400 active:bg-neutral-950 data-disabled:bg-neutral-50 data-disabled:text-neutral-500 hover:data-disabled:cursor-not-allowed active:data-disabled:bg-neutral-50"
      >
        Continue
      </Button>
      <Button
        disabled={loading}
        focusableWhenDisabled
        type="submit"
        onClick={() => {
          const demoUserId = usersJSON.findIndex((user) => user.email.startsWith("guest"));

          setUserEmail(usersJSON[demoUserId].email);
          setUserPassword(usersJSON[demoUserId].password!);
        }}
        className="cursor-pointer self-center rounded-md p-px text-neutral-600 outline-0 hover:underline hover:underline-offset-4 focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-neutral-400 data-disabled:text-neutral-400 hover:data-disabled:cursor-not-allowed hover:data-disabled:no-underline focus-visible:data-disabled:outline-2"
      >
        Log in as guest
      </Button>
    </Form>
  );
}
