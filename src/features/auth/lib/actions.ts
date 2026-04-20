"use server";

import { z } from "zod";

import { redirect } from "next/navigation";

import { APIError, isAPIError } from "better-auth/api";

import { auth } from "@/lib/auth";

import type { ActionReturnType } from "@/lib/definitions";

import { LoginFormSchema } from "@/features/auth/lib/schemas";

type AuthenticateUserReturnType = ActionReturnType<Partial<{ email: string; password: string }>>;

export const authenticateUser = async (_prevState: unknown, formData: FormData): AuthenticateUserReturnType => {
  const parsedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  try {
    if (!parsedFields.success) {
      const { fieldErrors } = z.flattenError(parsedFields.error);

      return {
        success: false,
        serverErrors: {
          email: fieldErrors.email?.toString(),
          password: fieldErrors.password?.toString(),
        },
      };
    }

    const response = await auth.api.signInEmail({
      body: {
        email: parsedFields.data.email,
        password: parsedFields.data.password,
      },
      asResponse: true,
    });

    const data = await response.json();

    if (!response.ok) {
      const status = response.status === 401 ? "UNAUTHORIZED" : undefined;
      throw new APIError(status, { message: data.message, code: data.code });
    }
  } catch (error) {
    if (isAPIError(error)) {
      if (error.body?.code === auth.$ERROR_CODES.INVALID_EMAIL_OR_PASSWORD.code) {
        return {
          success: false,
          serverErrors: {
            password: `${error.message}.`,
          },
        };
      }
    }

    return {
      success: false,
      serverErrors: {
        password: "A server error has occurred.",
      },
    };
  }

  redirect("/dashboard");
};
