import { env } from "@/env/server";

/**
 * Get client side configuration from server
 */
export function getConfig() {
  return {
    client: {
      baseURL: env.PUBLIC_API_URL,
      LOGIN_URL: env.LOGIN_URL,
      MANAGEMENT_APP_URL: env.MANAGEMENT_APP_URL,
      THREAT_APP_URL: env.THREAT_APP_URL,
      API_DOMAIN: env.API_DOMAIN,
    },
  };
}

export type IAppConfig = ReturnType<typeof getConfig>;
