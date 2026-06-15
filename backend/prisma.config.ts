import "dotenv/config";
import { defineConfig, env } from "prisma/config";
import { process } from "zod/v4/core";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.js",
  },
  datasource: {
      url: env("DIRECT_URL"),
  },
});
