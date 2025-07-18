import { useSessionStore } from "@/context/session/session.store";
import { IAppConfig } from "@/utils/config";
import api from "@clean-start-dashboard/sdk";
import React, { createContext, useContext } from "react";

export const ConfigContext = createContext<IAppConfig | null>(null);

export const ConfigProvider = (
  props: React.PropsWithChildren<{ config: IAppConfig }>
) => {
  return (
    <ConfigContext.Provider value={props.config}>
      {props.children}
    </ConfigContext.Provider>
  );
};

/**
 * Get connection option to be used with the api client
 * @returns The connection options to be used with the api client
 */
export function useConnection(): api.IConnection {
  const config = useContext(ConfigContext);
  const { session_id } = useSessionStore();
  if (!config) throw new Error("No connection found in context");
  // get auth token from session
  const session = {
    data: {
      session_id: session_id,
    },
  };
  if (session.data?.session_id) {
    return {
      host: config.client.baseURL,
      headers: {
        session_id: `${session.data.session_id}`,
        "User-Agent": "Triam - Clean Start 1.0",
        "Strict-Transport-Security":
          "max-age=63072000; includeSubDomains; preload",
        "Content-Security-Policy": `
              default-src 'self';
              script-src 'self' 'unsafe-eval' https://fonts.googleapis.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              img-src 'self' data:;
              connect-src 'self' ${config.client.API_DOMAIN} https://unpkg.com https://fonts.gstatic.com https://fonts.googleapis.com https://cdn.jsdelivr.net;
              frame-ancestors 'none';
            `.replace(/\s{2,}/g, " "),
      },
    };
  }
  return {
    host: config.client.baseURL,
    // headers: {
    //   "User-Agent": "eventus-app",
    //   "Content-Security-Policy":
    //     "default-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self';",
    //   "Strict-Transport-Security":
    //     "max-age=63072000; includeSubDomains; preload",
    // },
  };
}

export function useConfig() {
  const config = useContext(ConfigContext);
  if (config === null) {
    throw new Error("No config found in context");
  }
  return config;
}
