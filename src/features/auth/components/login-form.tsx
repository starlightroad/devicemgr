"use client";

import { useActionState, useState } from "react";

import usersJSON from "@/lib/data/users.json";

import { authenticateUser } from "@/features/auth/lib/actions";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export default function LoginForm() {
  const [state, formAction, loading] = useActionState(authenticateUser, undefined);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field>
        <FieldLabel htmlFor="email" className="sr-only">
          Email
        </FieldLabel>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="off"
          value={userEmail}
          required
          className="h-10"
          onChange={(e) => setUserEmail(e.target.value)}
        />
        {state?.serverErrors?.email && !loading ? (
          <p aria-live="polite" className="text-danger px-1 text-xs">
            {state.serverErrors.email}
          </p>
        ) : (
          <FieldError />
        )}
      </Field>
      <Field>
        <FieldLabel htmlFor="password" className="sr-only">
          Password
        </FieldLabel>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={userPassword}
          required
          className="h-10"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        {state?.serverErrors?.password && !loading ? (
          <p aria-live="polite" className="text-danger px-1 text-xs">
            {state.serverErrors.password}
          </p>
        ) : (
          <FieldError />
        )}
      </Field>
      <Button type="submit" disabled={loading} className="h-10 w-full">
        Continue
      </Button>
      <Button
        type="submit"
        variant="ghost"
        disabled={loading}
        className="h-10 w-full"
        onClick={() => {
          const demoUserId = usersJSON.findIndex((user) => user.email.startsWith("guest"));

          setUserEmail(usersJSON[demoUserId].email);
          setUserPassword(usersJSON[demoUserId].password!);
        }}
      >
        Log in as guest
      </Button>
    </form>
  );
}
