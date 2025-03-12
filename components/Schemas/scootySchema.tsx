import { z } from "zod";

export const scootySchema = z.object({
  imei: z.string().trim().min(1, "IMEI is required"),
  model: z.string().trim().min(1, "Model is required"),
  name: z.string().trim().min(1, "Name is required"),
});

export type ScootyFormData = z.infer<typeof scootySchema>;
