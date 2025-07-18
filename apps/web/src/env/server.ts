import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PUBLIC_API_URL: z.string() as any,
    LOGIN_URL: z.string() as any,
    MANAGEMENT_APP_URL: z.string().optional() as any,
    THREAT_APP_URL: z.string().optional() as any,
    ADVISORY_GRAPH_URL: z.string().optional() as any,
    API_DOMAIN: z.string().optional() as any,
  },
  runtimeEnv: {
    PUBLIC_API_URL: process.env.PUBLIC_API_URL,
    LOGIN_URL: process.env.LOGIN_URL,
    MANAGEMENT_APP_URL: process.env.MANAGEMENT_APP_URL,
    THREAT_APP_URL: process.env.THREAT_APP_URL,
    ADVISORY_GRAPH_URL: process.env.ADVISORY_GRAPH_URL,
    API_DOMAIN: process.env.API_DOMAIN,
  },
});
