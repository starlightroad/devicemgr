import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.email("Email is required."),
  password: z.string().min(1, "Password is required.").max(32, "Password must be 32 characters or less."),
});
