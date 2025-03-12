import { z } from "zod";

export const adminSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z
    .string()
    .email("Invalid email format")
    .refine((val) => val.includes("@"), {
      message: "Email must contain '@'",
    }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/\d/, "Password must contain at least one number"),
});

export type AdminFormData = z.infer<typeof adminSchema>;
