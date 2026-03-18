import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";

import { prisma } from "./db.js"; // aproveita o prisma já configurado

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL, // opcional, mas você já tem no .env
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8081", // Swagger na própria API
  ],
  emailAndPassword: {
    enabled: true,
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [openAPI()],
});
