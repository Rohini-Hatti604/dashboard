/**
 * @packageDocumentation
 * @module api.functional.dashboard_profile.favourite.add
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";

import type { IAddToFavouriteRequest } from "../../../../structures/IAddToFavouriteRequest";

/**
 * @controller DashboardProfileController.addToFavourite
 * @path POST /dashboard-profile/favourite/add
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function addToFavourite(
  connection: IConnection,
  inputs: addToFavourite.Input,
): Promise<addToFavourite.Output> {
  return PlainFetcher.fetch(
    {
      ...connection,
      headers: {
        ...connection.headers,
        "Content-Type": "application/json",
      },
    },
    {
      ...addToFavourite.METADATA,
      template: addToFavourite.METADATA.path,
      path: addToFavourite.path(),
    },
    inputs,
  );
}
export namespace addToFavourite {
  export type Input = IAddToFavouriteRequest;
  export type Output = any;

  export const METADATA = {
    method: "POST",
    path: "/dashboard-profile/favourite/add",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 201,
  } as const;

  export const path = () => "/dashboard-profile/favourite/add";
}
