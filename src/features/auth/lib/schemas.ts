import { z } from "zod";

import { MAX_PASSWORD, MIN_PASSWORD } from "@/features/auth";

export const LoginFormSchema = z.object({
  email: z.email("Email is required."),
  password: z.string().min(MIN_PASSWORD.length, MIN_PASSWORD.message).max(MAX_PASSWORD.length, MAX_PASSWORD.message),
});
