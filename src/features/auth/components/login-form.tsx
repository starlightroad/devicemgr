"use client";

import { useActionState, useState } from "react";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";

import usersJSON from "@/lib/data/users.json";

import { authenticateUser } from "@/features/auth";

export default function LoginForm() {
  const [state, formAction, loading] = useActionState(authenticateUser, undefined);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <Form action={formAction} className="flex flex-col gap-4">
      <TextField type="email" name="email" isRequired>
        <Label className="sr-only">Email</Label>
        <Input
          variant="secondary"
          placeholder="Email"
          autoComplete="off"
          className="h-10"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        {state?.serverErrors.email && !loading ? (
          <p aria-live="polite" className="text-danger px-1 text-xs">
            {state.serverErrors.email}
          </p>
        ) : (
          <FieldError />
        )}
      </TextField>
      <TextField type="password" name="password" isRequired>
        <Label className="sr-only">Password</Label>
        <Input
          variant="secondary"
          placeholder="Password"
          className="h-10"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        {state?.serverErrors.password && !loading ? (
          <p aria-live="polite" className="text-danger px-1 text-xs">
            {state.serverErrors.password}
          </p>
        ) : (
          <FieldError />
        )}
      </TextField>
      <Button type="submit" isDisabled={loading} fullWidth className="h-10">
        Continue
      </Button>
      <Button
        type="submit"
        variant="ghost"
        isDisabled={loading}
        fullWidth
        className="h-10"
        onClick={() => {
          const demoUserId = usersJSON.findIndex((user) => user.email.startsWith("guest"));

          setUserEmail(usersJSON[demoUserId].email);
          setUserPassword(usersJSON[demoUserId].password!);
        }}
      >
        Log in as guest
      </Button>
    </Form>
  );
}
