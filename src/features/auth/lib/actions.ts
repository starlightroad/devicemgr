"use server";

import { z } from "zod";

import type { Form } from "@base-ui/react";

import { LoginFormSchema } from "@/features/auth";

export const authenticateUser = async (_previousState: { serverErrors?: Form.Props["errors"] }, formData: FormData) => {
  const parsedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  try {
    if (!parsedFields.success) {
      return {
        serverErrors: z.flattenError(parsedFields.error).fieldErrors,
      };
    }

    // TODO: perform authentication
  } catch {
    return {
      serverErrors: {
        password: "A server error has occurred.",
      },
    };
  }

  return {};
};
