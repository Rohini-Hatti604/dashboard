/**
 * @packageDocumentation
 * @module api.functional.role
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";

import type { ICreateRoleRequest } from "../../structures/ICreateRoleRequest";
import type { IListEntitiesRequestIRole } from "../../structures/IListEntitiesRequestIRole";
import type { IRole } from "../../structures/IRole";
import type { IUpdateRoleRequest } from "../../structures/IUpdateRoleRequest";

/**
 * @controller RoleController.create
 * @path POST /role/create
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function create(
  connection: IConnection,
  inputs: create.Input,
): Promise<create.Output> {
  return PlainFetcher.fetch(
    {
      ...connection,
      headers: {
        ...connection.headers,
        "Content-Type": "application/json",
      },
    },
    {
      ...create.METADATA,
      template: create.METADATA.path,
      path: create.path(),
    },
    inputs,
  );
}
export namespace create {
  export type Input = ICreateRoleRequest;
  export type Output = IRole;

  export const METADATA = {
    method: "POST",
    path: "/role/create",
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

  export const path = () => "/role/create";
}

/**
 * @controller RoleController.update
 * @path POST /role/update
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function update(
  connection: IConnection,
  inputs: update.Input,
): Promise<update.Output> {
  return PlainFetcher.fetch(
    {
      ...connection,
      headers: {
        ...connection.headers,
        "Content-Type": "application/json",
      },
    },
    {
      ...update.METADATA,
      template: update.METADATA.path,
      path: update.path(),
    },
    inputs,
  );
}
export namespace update {
  export type Input = IUpdateRoleRequest;
  export type Output = IRole;

  export const METADATA = {
    method: "POST",
    path: "/role/update",
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

  export const path = () => "/role/update";
}

/**
 * @controller RoleController.list
 * @path POST /role/list
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function list(
  connection: IConnection,
  inputs: list.Input,
): Promise<list.Output> {
  return PlainFetcher.fetch(
    {
      ...connection,
      headers: {
        ...connection.headers,
        "Content-Type": "application/json",
      },
    },
    {
      ...list.METADATA,
      template: list.METADATA.path,
      path: list.path(),
    },
    inputs,
  );
}
export namespace list {
  export type Input = IListEntitiesRequestIRole;
  export type Output = any;

  export const METADATA = {
    method: "POST",
    path: "/role/list",
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

  export const path = () => "/role/list";
}
