import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  CLERK_SIGNING_SECRET: z.string(),

  FIREBASE_API_KEY: z.string(),
  FIREBASE_AUTH_DOMAIN: z.string(),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_STORAGE_BUCKET: z.string(),
  FIREBASE_MESSAGING_SENDER_ID: z.string(),
  FIREBASE_APP_ID: z.string(),
  FIREBASE_MEASUREMENT_ID: z.string(),
});

export const env = envSchema.parse(process.env);
